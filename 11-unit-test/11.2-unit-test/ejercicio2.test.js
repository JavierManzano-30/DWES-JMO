import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { dateCompare, dateDifference, dateDifferenceInDays } from './ejercicio2.js';

describe('Ejercicio 2: Comparación de fechas', () => {
    describe('dateCompare', () => {
        test('debe retornar fechas ordenadas cuando date1 es anterior a date2', () => {
            const date1 = new Date('2024-01-01');
            const date2 = new Date('2024-01-02');

            const result = dateCompare(date1, date2);

            expect(result.startDate).toBe(date1.toISOString());
            expect(result.endDate).toBe(date2.toISOString());
        });

        test('debe retornar fechas ordenadas cuando date1 es posterior a date2', () => {
            const date1 = new Date('2024-01-02');
            const date2 = new Date('2024-01-01');

            const result = dateCompare(date1, date2);

            expect(result.startDate).toBe(date2.toISOString());
            expect(result.endDate).toBe(date1.toISOString());
        });

        test('debe manejar fechas iguales correctamente', () => {
            const date1 = new Date('2024-01-01T12:00:00Z');
            const date2 = new Date('2024-01-01T12:00:00Z');

            const result = dateCompare(date1, date2);

            expect(result.startDate).toBe(result.endDate);
            expect(result.startDate).toBe(date1.toISOString());
        });

        test('debe comparar con fecha actual cuando solo se proporciona una fecha', () => {
            const mockDate = new Date('2024-01-01T12:00:00Z');
            vi.setSystemTime(mockDate);

            const pastDate = new Date('2023-01-01');
            const result = dateCompare(pastDate);

            expect(result.startDate).toBe(pastDate.toISOString());
            expect(result.endDate).toBe(mockDate.toISOString());
        });

        test('debe manejar fechas futuras cuando solo se proporciona una fecha', () => {
            const mockDate = new Date('2024-01-01T12:00:00Z');
            vi.setSystemTime(mockDate);

            const futureDate = new Date('2025-01-01');
            const result = dateCompare(futureDate);

            expect(result.startDate).toBe(mockDate.toISOString());
            expect(result.endDate).toBe(futureDate.toISOString());
        });

        test('debe aceptar fechas como strings ISO', () => {
            const date1 = '2024-01-01T00:00:00Z';
            const date2 = '2024-01-02T00:00:00Z';

            const result = dateCompare(date1, date2);

            expect(result.startDate).toBe(new Date(date1).toISOString());
            expect(result.endDate).toBe(new Date(date2).toISOString());
        });

        test('debe aceptar combinación de Date y string ISO', () => {
            const date1 = new Date('2024-01-01');
            const date2 = '2024-01-02T00:00:00Z';

            const result = dateCompare(date1, date2);

            expect(result.startDate).toBe(date1.toISOString());
            expect(result.endDate).toBe(new Date(date2).toISOString());
        });

        test('debe lanzar error si date1 no es válida', () => {
            expect(() => dateCompare('invalid-date')).toThrow('La primera fecha no es válida');
            expect(() => dateCompare('not-a-date')).toThrow('La primera fecha no es válida');
        });

        test('debe lanzar error si date2 no es válida', () => {
            const validDate = new Date('2024-01-01');
            expect(() => dateCompare(validDate, 'invalid-date')).toThrow(
                'La segunda fecha no es válida'
            );
        });

        test('debe lanzar error si no se proporciona ninguna fecha', () => {
            expect(() => dateCompare(null)).toThrow('Debe proporcionar al menos una fecha');
            expect(() => dateCompare(undefined)).toThrow('Debe proporcionar al menos una fecha');
        });

        test('debe manejar fechas con diferentes zonas horarias', () => {
            const date1 = new Date('2024-01-01T00:00:00Z');
            const date2 = new Date('2024-01-01T01:00:00+01:00'); // Misma fecha en diferente zona

            const result = dateCompare(date1, date2);

            // Las fechas deben estar ordenadas correctamente según UTC
            expect(new Date(result.startDate).getTime()).toBeLessThanOrEqual(
                new Date(result.endDate).getTime()
            );
        });

        test('debe manejar fechas muy separadas en el tiempo', () => {
            const date1 = new Date('2000-01-01');
            const date2 = new Date('2024-01-01');

            const result = dateCompare(date1, date2);

            expect(result.startDate).toBe(date1.toISOString());
            expect(result.endDate).toBe(date2.toISOString());
        });

        test('debe manejar fechas con milisegundos', () => {
            const date1 = new Date('2024-01-01T12:00:00.100Z');
            const date2 = new Date('2024-01-01T12:00:00.200Z');

            const result = dateCompare(date1, date2);

            expect(result.startDate).toBe(date1.toISOString());
            expect(result.endDate).toBe(date2.toISOString());
        });
    });

    describe('dateDifference', () => {
        test('debe calcular la diferencia en milisegundos correctamente', () => {
            const date1 = new Date('2024-01-01T00:00:00Z');
            const date2 = new Date('2024-01-01T00:00:01Z'); // 1 segundo después

            const diff = dateDifference(date1, date2);

            expect(diff).toBe(1000); // 1 segundo = 1000 ms
        });

        test('debe retornar diferencia positiva cuando date1 es anterior', () => {
            const date1 = new Date('2024-01-01');
            const date2 = new Date('2024-01-02');

            const diff = dateDifference(date1, date2);

            expect(diff).toBeGreaterThan(0);
        });

        test('debe retornar diferencia positiva cuando date1 es posterior (se ordena internamente)', () => {
            const date1 = new Date('2024-01-02');
            const date2 = new Date('2024-01-01');

            const diff = dateDifference(date1, date2);

            expect(diff).toBeGreaterThan(0); // Siempre positiva porque se ordena
        });
    });

    describe('dateDifferenceInDays', () => {
        test('debe calcular la diferencia en días correctamente', () => {
            const date1 = new Date('2024-01-01');
            const date2 = new Date('2024-01-02');

            const diff = dateDifferenceInDays(date1, date2);

            expect(diff).toBe(1);
        });

        test('debe calcular múltiples días correctamente', () => {
            const date1 = new Date('2024-01-01');
            const date2 = new Date('2024-01-05');

            const diff = dateDifferenceInDays(date1, date2);

            expect(diff).toBe(4);
        });

        test('debe manejar diferencias de meses', () => {
            const date1 = new Date('2024-01-01');
            const date2 = new Date('2024-02-01');

            const diff = dateDifferenceInDays(date1, date2);

            expect(diff).toBe(31); // Enero tiene 31 días
        });

        test('debe manejar diferencias de años', () => {
            const date1 = new Date('2024-01-01');
            const date2 = new Date('2025-01-01');

            const diff = dateDifferenceInDays(date1, date2);

            expect(diff).toBe(366); // 2024 es año bisiesto
        });

        test('debe calcular días desde fecha pasada hasta ahora', () => {
            const mockDate = new Date('2024-01-05T12:00:00Z');
            vi.setSystemTime(mockDate);

            const pastDate = new Date('2024-01-01');
            const diff = dateDifferenceInDays(pastDate);

            expect(diff).toBe(4); // 4 días desde el 1 hasta el 5
        });
    });

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });
});
