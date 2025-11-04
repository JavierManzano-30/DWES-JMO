import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import {
    getWeatherData,
    sendEmail,
    getCurrencyExchangeRate,
    formatWeatherReport,
    sendNotificationEmail,
    convertCurrency,
} from './ejercicio5.js';

// Mock global fetch
global.fetch = vi.fn();

describe('Ejercicio 5: Testing con Mocks', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Función 1: getWeatherData - Obtener datos del clima', () => {
        test('debe retornar datos del clima correctamente cuando la API responde exitosamente', async () => {
            const mockWeatherData = {
                city: 'Madrid',
                temperature: 22,
                condition: 'Sunny',
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockWeatherData,
            });

            const result = await getWeatherData('Madrid');

            expect(result).toEqual(mockWeatherData);
            expect(global.fetch).toHaveBeenCalledWith(
                'https://api.weather.com/v1/weather?city=Madrid'
            );
        });

        test('debe lanzar error cuando la API responde con error', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'Not Found',
            });

            await expect(getWeatherData('InvalidCity')).rejects.toThrow(
                'Error al obtener datos del clima: Not Found'
            );
        });

        test('debe manejar diferentes ciudades correctamente', async () => {
            const mockWeatherData = {
                city: 'Barcelona',
                temperature: 18,
                condition: 'Cloudy',
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockWeatherData,
            });

            const result = await getWeatherData('Barcelona');

            expect(result.city).toBe('Barcelona');
            expect(result.temperature).toBe(18);
            expect(result.condition).toBe('Cloudy');
        });
    });

    describe('Función 2: sendEmail - Enviar email', () => {
        test('debe enviar email correctamente cuando el servicio responde exitosamente', async () => {
            const mockResponse = {
                success: true,
                messageId: 'msg-12345',
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const result = await sendEmail('test@example.com', 'Test Subject', 'Test Body');

            expect(result.success).toBe(true);
            expect(result.messageId).toBe('msg-12345');
            expect(global.fetch).toHaveBeenCalledWith(
                'https://api.emailservice.com/v1/send',
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        to: 'test@example.com',
                        subject: 'Test Subject',
                        body: 'Test Body',
                    }),
                })
            );
        });

        test('debe lanzar error cuando el servicio de email falla', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'Service Unavailable',
            });

            await expect(sendEmail('test@example.com', 'Subject', 'Body')).rejects.toThrow(
                'Error al enviar email: Service Unavailable'
            );
        });

        test('debe enviar emails con diferentes destinatarios', async () => {
            const mockResponse = {
                success: true,
                messageId: 'msg-67890',
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const result = await sendEmail(
                'another@example.com',
                'Different Subject',
                'Different Body'
            );

            expect(result.success).toBe(true);
            const callArgs = global.fetch.mock.calls[0];
            const bodyData = JSON.parse(callArgs[1].body);
            expect(bodyData.to).toBe('another@example.com');
        });
    });

    describe('Función 3: getCurrencyExchangeRate - Obtener tasa de cambio', () => {
        test('debe retornar tasa de cambio correctamente', async () => {
            const mockExchangeData = {
                from: 'USD',
                to: 'EUR',
                rate: 0.85,
                timestamp: 1234567890,
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockExchangeData,
            });

            const result = await getCurrencyExchangeRate('USD', 'EUR');

            expect(result).toEqual(mockExchangeData);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('https://api.currency.com/v1/exchange?from=USD&to=EUR')
            );
        });

        test('debe incluir API key en la petición', async () => {
            const originalEnv = process.env.CURRENCY_API_KEY;
            process.env.CURRENCY_API_KEY = 'test-api-key';

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    from: 'USD',
                    to: 'GBP',
                    rate: 0.75,
                    timestamp: 1234567890,
                }),
            });

            await getCurrencyExchangeRate('USD', 'GBP');

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('apiKey=test-api-key')
            );

            if (originalEnv) {
                process.env.CURRENCY_API_KEY = originalEnv;
            } else {
                delete process.env.CURRENCY_API_KEY;
            }
        });

        test('debe lanzar error cuando la API de cambio falla', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'Invalid Currency Pair',
            });

            await expect(getCurrencyExchangeRate('INVALID', 'EUR')).rejects.toThrow(
                'Error al obtener tasa de cambio: Invalid Currency Pair'
            );
        });

        test('debe manejar diferentes pares de monedas', async () => {
            const mockExchangeData = {
                from: 'EUR',
                to: 'GBP',
                rate: 0.88,
                timestamp: 1234567890,
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockExchangeData,
            });

            const result = await getCurrencyExchangeRate('EUR', 'GBP');

            expect(result.from).toBe('EUR');
            expect(result.to).toBe('GBP');
            expect(result.rate).toBe(0.88);
        });
    });

    describe('Función auxiliar: formatWeatherReport', () => {
        test('debe formatear correctamente el reporte del clima', async () => {
            const mockWeatherData = {
                city: 'Valencia',
                temperature: 25,
                condition: 'Sunny',
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockWeatherData,
            });

            const result = await formatWeatherReport('Valencia');

            expect(result).toBe('Valencia: 25°C, Sunny');
        });

        test('debe manejar errores en el formato del reporte', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'Not Found',
            });

            const result = await formatWeatherReport('InvalidCity');

            expect(result).toBe('Error al obtener datos del clima para InvalidCity');
        });
    });

    describe('Función auxiliar: sendNotificationEmail', () => {
        test('debe retornar true cuando el email se envía correctamente', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    messageId: 'msg-123',
                }),
            });

            const result = await sendNotificationEmail('user@example.com', 'Test notification');

            expect(result).toBe(true);
        });

        test('debe retornar false cuando el email falla', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'Service Error',
            });

            const result = await sendNotificationEmail('user@example.com', 'Test notification');

            expect(result).toBe(false);
        });
    });

    describe('Función auxiliar: convertCurrency', () => {
        test('debe convertir moneda correctamente', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    from: 'USD',
                    to: 'EUR',
                    rate: 0.85,
                    timestamp: 1234567890,
                }),
            });

            const result = await convertCurrency(100, 'USD', 'EUR');

            expect(result).toBe(85); // 100 * 0.85
        });

        test('debe manejar diferentes cantidades', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    from: 'EUR',
                    to: 'GBP',
                    rate: 0.88,
                    timestamp: 1234567890,
                }),
            });

            const result = await convertCurrency(50, 'EUR', 'GBP');

            expect(result).toBe(44); // 50 * 0.88
        });

        test('debe propagar errores de la API', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'API Error',
            });

            await expect(convertCurrency(100, 'USD', 'EUR')).rejects.toThrow(
                'Error al obtener tasa de cambio: API Error'
            );
        });
    });

    describe('Casos de integración con múltiples mocks', () => {
        test('debe poder usar múltiples servicios externos en secuencia', async () => {
            // Mock para obtener clima
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    city: 'Madrid',
                    temperature: 20,
                    condition: 'Sunny',
                }),
            });

            // Mock para enviar email
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    messageId: 'msg-weather',
                }),
            });

            const weatherReport = await formatWeatherReport('Madrid');
            const emailSent = await sendNotificationEmail('user@example.com', weatherReport);

            expect(weatherReport).toContain('Madrid');
            expect(emailSent).toBe(true);
            expect(global.fetch).toHaveBeenCalledTimes(2);
        });
    });
});
