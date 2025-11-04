import { describe, test, expect } from 'vitest';
import { flexibleFizzBuzz, classicFizzBuzz, flexibleFizzBuzzString } from './ejercicio4.js';

describe('Ejercicio 4: FizzBuzz Flexible', () => {
    describe('classicFizzBuzz - Versión clásica (Fizz=3, Buzz=5)', () => {
        test('debe retornar números normales para números no divisibles por 3 ni 5', () => {
            const result = classicFizzBuzz(2);
            expect(result).toEqual([1, 2]);
        });

        test('debe retornar "Fizz" para números divisibles por 3', () => {
            const result = classicFizzBuzz(3);
            expect(result).toEqual([1, 2, 'Fizz']);
        });

        test('debe retornar "Buzz" para números divisibles por 5', () => {
            const result = classicFizzBuzz(5);
            expect(result).toEqual([1, 2, 'Fizz', 4, 'Buzz']);
        });

        test('debe retornar "FizzBuzz" para números divisibles por 3 y 5', () => {
            const result = classicFizzBuzz(15);
            expect(result[14]).toBe('FizzBuzz'); // índice 14 = número 15
        });

        test('debe manejar correctamente el caso límite de 15', () => {
            const result = classicFizzBuzz(15);
            expect(result).toEqual([
                1,
                2,
                'Fizz',
                4,
                'Buzz',
                'Fizz',
                7,
                8,
                'Fizz',
                'Buzz',
                11,
                'Fizz',
                13,
                14,
                'FizzBuzz',
            ]);
        });
    });

    describe('flexibleFizzBuzz - Con condiciones personalizadas', () => {
        test('debe aceptar condiciones personalizadas', () => {
            const conditions = [
                { divisor: 2, word: 'Even' },
                { divisor: 3, word: 'Odd' },
            ];
            const result = flexibleFizzBuzz(6, conditions);
            expect(result[1]).toBe('Even'); // 2
            expect(result[2]).toBe('Odd'); // 3
            expect(result[5]).toBe('EvenOdd'); // 6 (divisible por 2 y 3)
        });

        test('debe manejar múltiples condiciones correctamente', () => {
            const conditions = [
                { divisor: 2, word: 'Dos' },
                { divisor: 3, word: 'Tres' },
                { divisor: 4, word: 'Cuatro' },
            ];
            const result = flexibleFizzBuzz(12, conditions);
            expect(result[11]).toBe('DosTresCuatro'); // 12 es divisible por 2, 3 y 4
        });

        test('debe combinar palabras cuando hay múltiples divisores', () => {
            const conditions = [
                { divisor: 3, word: 'Fizz' },
                { divisor: 5, word: 'Buzz' },
                { divisor: 7, word: 'Bazz' },
            ];
            const result = flexibleFizzBuzz(105, conditions);
            expect(result[104]).toBe('FizzBuzzBazz'); // 105 es divisible por 3, 5 y 7
        });

        test('debe manejar condiciones con un solo divisor', () => {
            const conditions = [{ divisor: 2, word: 'Par' }];
            const result = flexibleFizzBuzz(5, conditions);
            expect(result).toEqual([1, 'Par', 3, 'Par', 5]);
        });

        test('debe retornar números cuando no hay condiciones', () => {
            const result = flexibleFizzBuzz(5, []);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        test('debe manejar condiciones con palabras en español', () => {
            const conditions = [
                { divisor: 3, word: 'Tres' },
                { divisor: 5, word: 'Cinco' },
            ];
            const result = flexibleFizzBuzz(15, conditions);
            expect(result[14]).toBe('TresCinco');
        });

        test('debe manejar condiciones con divisores primos grandes', () => {
            const conditions = [
                { divisor: 7, word: 'Siete' },
                { divisor: 11, word: 'Once' },
            ];
            const result = flexibleFizzBuzz(77, conditions);
            expect(result[76]).toBe('SieteOnce'); // 77 es divisible por 7 y 11
        });

        test('debe manejar condiciones con el mismo divisor múltiples veces', () => {
            const conditions = [
                { divisor: 3, word: 'Fizz' },
                { divisor: 3, word: 'Fizz' }, // duplicado
            ];
            const result = flexibleFizzBuzz(6, conditions);
            expect(result[2]).toBe('FizzFizz'); // 3
            expect(result[5]).toBe('FizzFizz'); // 6
        });
    });

    describe('Validaciones de entrada', () => {
        test('debe lanzar error si max no es un entero positivo', () => {
            expect(() => flexibleFizzBuzz(0)).toThrow(
                'El valor máximo debe ser un entero positivo'
            );
            expect(() => flexibleFizzBuzz(-1)).toThrow(
                'El valor máximo debe ser un entero positivo'
            );
            expect(() => flexibleFizzBuzz(1.5)).toThrow(
                'El valor máximo debe ser un entero positivo'
            );
        });

        test('debe lanzar error si conditions no es un array', () => {
            expect(() => flexibleFizzBuzz(10, 'invalid')).toThrow(
                'Las condiciones deben ser un array'
            );
            expect(() => flexibleFizzBuzz(10, null)).toThrow('Las condiciones deben ser un array');
            expect(() => flexibleFizzBuzz(10, {})).toThrow('Las condiciones deben ser un array');
        });
    });

    describe('flexibleFizzBuzzString - Versión que retorna string', () => {
        test('debe retornar string con resultados separados por salto de línea', () => {
            const stringResult = flexibleFizzBuzzString(3, [
                { divisor: 3, word: 'Fizz' },
                { divisor: 5, word: 'Buzz' },
            ]);
            expect(stringResult).toBe('1\n2\nFizz');
        });

        test('debe manejar condiciones personalizadas en formato string', () => {
            const conditions = [
                { divisor: 2, word: 'Par' },
                { divisor: 3, word: 'Impar' },
            ];
            const stringResult = flexibleFizzBuzzString(6, conditions);
            expect(stringResult).toBe('1\nPar\nImpar\nPar\n5\nParImpar');
        });
    });

    describe('Casos edge y límites', () => {
        test('debe manejar correctamente max = 1', () => {
            const result = classicFizzBuzz(1);
            expect(result).toEqual([1]);
        });

        test('debe manejar números grandes correctamente', () => {
            const result = classicFizzBuzz(100);
            expect(result).toHaveLength(100);
            expect(result[99]).toBe('Buzz'); // 100 es divisible por 5
        });

        test('debe manejar condiciones con divisores grandes', () => {
            const conditions = [{ divisor: 100, word: 'Cien' }];
            const result = flexibleFizzBuzz(200, conditions);
            expect(result[99]).toBe('Cien'); // 100
            expect(result[199]).toBe('Cien'); // 200
        });
    });
});
