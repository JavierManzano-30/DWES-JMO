/**
 * Ejercicio 5: Funciones que dependen de servicios externos
 * Estas funciones simulan dependencias de servicios externos que necesitan ser mockeadas
 */

/**
 * Función 1: Obtener datos del clima desde una API externa
 * @param {string} city - Nombre de la ciudad
 * @returns {Promise<{city: string, temperature: number, condition: string}>}
 */
export async function getWeatherData(city) {
    // Simulación de llamada a API externa
    const response = await fetch(`https://api.weather.com/v1/weather?city=${city}`);

    if (!response.ok) {
        throw new Error(`Error al obtener datos del clima: ${response.statusText}`);
    }

    const data = await response.json();
    return {
        city: data.city,
        temperature: data.temperature,
        condition: data.condition,
    };
}

/**
 * Función 2: Enviar email usando un servicio de email externo
 * @param {string} to - Dirección de email destino
 * @param {string} subject - Asunto del email
 * @param {string} body - Cuerpo del email
 * @returns {Promise<{success: boolean, messageId: string}>}
 */
export async function sendEmail(to, subject, body) {
    // Simulación de llamada a servicio de email externo
    const emailService = {
        send: async emailData => {
            // Simulación de llamada HTTP
            const response = await fetch('https://api.emailservice.com/v1/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            if (!response.ok) {
                throw new Error(`Error al enviar email: ${response.statusText}`);
            }

            return await response.json();
        },
    };

    const result = await emailService.send({ to, subject, body });

    return {
        success: result.success,
        messageId: result.messageId,
    };
}

/**
 * Función 3: Obtener tasa de cambio de moneda desde un servicio financiero
 * @param {string} fromCurrency - Moneda origen (ej: 'USD')
 * @param {string} toCurrency - Moneda destino (ej: 'EUR')
 * @returns {Promise<{from: string, to: string, rate: number, timestamp: number}>}
 */
export async function getCurrencyExchangeRate(fromCurrency, toCurrency) {
    // Simulación de llamada a API de cambio de moneda
    const apiKey = process.env.CURRENCY_API_KEY || 'default-key';

    const response = await fetch(
        `https://api.currency.com/v1/exchange?from=${fromCurrency}&to=${toCurrency}&apiKey=${apiKey}`
    );

    if (!response.ok) {
        throw new Error(`Error al obtener tasa de cambio: ${response.statusText}`);
    }

    const data = await response.json();

    return {
        from: data.from,
        to: data.to,
        rate: data.rate,
        timestamp: data.timestamp,
    };
}

/**
 * Función auxiliar: Procesar datos del clima y formatearlos
 * @param {string} city - Nombre de la ciudad
 * @returns {Promise<string>} String formateado con los datos del clima
 */
export async function formatWeatherReport(city) {
    try {
        const weatherData = await getWeatherData(city);
        return `${weatherData.city}: ${weatherData.temperature}°C, ${weatherData.condition}`;
    } catch (error) {
        return `Error al obtener datos del clima para ${city}`;
    }
}

/**
 * Función auxiliar: Enviar email de notificación
 * @param {string} email - Dirección de email
 * @param {string} message - Mensaje de notificación
 * @returns {Promise<boolean>} true si se envió correctamente
 */
export async function sendNotificationEmail(email, message) {
    try {
        const result = await sendEmail(email, 'Notificación', message);
        return result.success;
    } catch (error) {
        console.error('Error al enviar notificación:', error);
        return false;
    }
}

/**
 * Función auxiliar: Convertir moneda
 * @param {number} amount - Cantidad a convertir
 * @param {string} fromCurrency - Moneda origen
 * @param {string} toCurrency - Moneda destino
 * @returns {Promise<number>} Cantidad convertida
 */
export async function convertCurrency(amount, fromCurrency, toCurrency) {
    const exchangeRate = await getCurrencyExchangeRate(fromCurrency, toCurrency);
    return amount * exchangeRate.rate;
}
