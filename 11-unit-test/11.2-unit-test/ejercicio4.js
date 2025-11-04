/**
 * FizzBuzz flexible con condiciones dinámicas
 * Permite configurar diferentes divisores y sus palabras correspondientes
 */

/**
 * Genera un array de resultados FizzBuzz según las condiciones especificadas
 * @param {number} max - Número máximo hasta el cual generar la secuencia
 * @param {Array<{divisor: number, word: string}>} conditions - Array de condiciones con divisor y palabra
 * @returns {Array<string|number>} Array con los resultados de FizzBuzz
 */
export function flexibleFizzBuzz(max, conditions = []) {
    if (!Number.isInteger(max) || max < 1) {
        throw new Error('El valor máximo debe ser un entero positivo');
    }

    // Validar condiciones
    if (!Array.isArray(conditions)) {
        throw new Error('Las condiciones deben ser un array');
    }

    // Ordenar condiciones por divisor ascendente para mantener orden lógico (menores primero)
    const sortedConditions = [...conditions].sort((a, b) => a.divisor - b.divisor);

    const results = [];

    for (let i = 1; i <= max; i++) {
        let result = '';

        // Aplicar todas las condiciones que se cumplan
        for (const condition of sortedConditions) {
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
 * Versión simplificada con configuración por defecto (Fizz=3, Buzz=5)
 * @param {number} max - Número máximo hasta el cual generar la secuencia
 * @returns {Array<string|number>} Array con los resultados de FizzBuzz clásico
 */
export function classicFizzBuzz(max) {
    return flexibleFizzBuzz(max, [
        { divisor: 3, word: 'Fizz' },
        { divisor: 5, word: 'Buzz' },
    ]);
}

/**
 * Genera un string con los resultados separados por saltos de línea
 * @param {number} max - Número máximo hasta el cual generar la secuencia
 * @param {Array<{divisor: number, word: string}>} conditions - Array de condiciones
 * @returns {string} String con los resultados separados por \n
 */
export function flexibleFizzBuzzString(max, conditions = []) {
    const results = flexibleFizzBuzz(max, conditions);
    return results.join('\n');
}
