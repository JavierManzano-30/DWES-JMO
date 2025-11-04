/**
 * Ejercicio 3: FizzBuzz flexible con condiciones dinámicas
 * Modificación de FizzBuzz para recibir condiciones como objeto
 */

/**
 * Genera la secuencia FizzBuzz con condiciones dinámicas
 * @param {number} n - Número hasta el cual generar la secuencia
 * @param {Object<number, string>} conditions - Objeto con divisores como keys y palabras como values
 * @returns {Array<string|number>} Array con los resultados de FizzBuzz
 */
export function flexibleFizzBuzz(n, conditions = {}) {
    if (!Number.isInteger(n) || n < 1) {
        throw new Error('El número debe ser un entero positivo');
    }

    if (typeof conditions !== 'object' || conditions === null || Array.isArray(conditions)) {
        throw new Error('Las condiciones deben ser un objeto');
    }

    // Convertir el objeto a array de condiciones y ordenar por divisor ascendente
    const conditionsArray = Object.entries(conditions)
        .map(([divisor, word]) => ({
            divisor: Number(divisor),
            word: String(word),
        }))
        .filter(item => !isNaN(item.divisor) && item.divisor > 0)
        .sort((a, b) => a.divisor - b.divisor);

    const results = [];

    for (let i = 1; i <= n; i++) {
        let result = '';

        // Aplicar todas las condiciones que se cumplan
        for (const condition of conditionsArray) {
            if (i % condition.divisor === 0) {
                result += condition.word;
            }
        }

        // Si no se cumplió ninguna condición, usar el número
        results.push(result || i);
    }

    return results;
}

/**
 * Versión que retorna string con resultados separados por saltos de línea
 * @param {number} n - Número hasta el cual generar la secuencia
 * @param {Object<number, string>} conditions - Objeto con condiciones
 * @returns {string} String con los resultados separados por \n
 */
export function flexibleFizzBuzzString(n, conditions = {}) {
    const results = flexibleFizzBuzz(n, conditions);
    return results.join('\n');
}
