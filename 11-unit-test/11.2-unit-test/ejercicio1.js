/**
 * Ejercicio 1: FizzBuzz básico
 * Implementación clásica de FizzBuzz con tests completos
 */

/**
 * Genera la secuencia FizzBuzz hasta el número especificado
 * @param {number} n - Número hasta el cual generar la secuencia
 * @returns {Array<string|number>} Array con los resultados de FizzBuzz
 */
export function fizzBuzz(n) {
    if (!Number.isInteger(n) || n < 1) {
        throw new Error('El número debe ser un entero positivo');
    }

    const results = [];

    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            results.push('FizzBuzz');
        } else if (i % 3 === 0) {
            results.push('Fizz');
        } else if (i % 5 === 0) {
            results.push('Buzz');
        } else {
            results.push(i);
        }
    }

    return results;
}

/**
 * Genera un string con los resultados de FizzBuzz separados por saltos de línea
 * @param {number} n - Número hasta el cual generar la secuencia
 * @returns {string} String con los resultados separados por \n
 */
export function fizzBuzzString(n) {
    const results = fizzBuzz(n);
    return results.join('\n');
}
