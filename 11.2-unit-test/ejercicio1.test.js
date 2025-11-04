import { describe, test, expect } from 'vitest';
import { fizzBuzz, fizzBuzzString } from './ejercicio1.js';

describe('Ejercicio 1: FizzBuzz básico', () => {
    describe('fizzBuzz', () => {
        test('debe retornar números normales para números no divisibles por 3 ni 5', () => {
            const result = fizzBuzz(2);
            expect(result).toEqual([1, 2]);
        });

        test('debe retornar "Fizz" para números divisibles por 3', () => {
            const result = fizzBuzz(3);
            expect(result).toEqual([1, 2, 'Fizz']);
        });

        test('debe retornar "Buzz" para números divisibles por 5', () => {
            const result = fizzBuzz(5);
            expect(result).toEqual([1, 2, 'Fizz', 4, 'Buzz']);
        });

        test('debe retornar "FizzBuzz" para números divisibles por 3 y 5', () => {
            const result = fizzBuzz(15);
            expect(result[14]).toBe('FizzBuzz'); // índice 14 = número 15
        });

        test('debe manejar correctamente el caso límite de 15', () => {
            const result = fizzBuzz(15);
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

        test('debe manejar correctamente números grandes', () => {
            const result = fizzBuzz(30);
            expect(result).toHaveLength(30);
            expect(result[29]).toBe('FizzBuzz'); // 30
            expect(result[2]).toBe('Fizz'); // 3
            expect(result[4]).toBe('Buzz'); // 5
        });

        test('debe manejar correctamente max = 1', () => {
            const result = fizzBuzz(1);
            expect(result).toEqual([1]);
        });

        test('debe lanzar error si el número no es entero positivo', () => {
            expect(() => fizzBuzz(0)).toThrow('El número debe ser un entero positivo');
            expect(() => fizzBuzz(-1)).toThrow('El número debe ser un entero positivo');
            expect(() => fizzBuzz(1.5)).toThrow('El número debe ser un entero positivo');
            expect(() => fizzBuzz(null)).toThrow();
            expect(() => fizzBuzz(undefined)).toThrow();
        });

        test('debe verificar múltiples casos de FizzBuzz en secuencia', () => {
            const result = fizzBuzz(30);
            // Verificar algunos casos específicos
            expect(result[14]).toBe('FizzBuzz'); // 15
            expect(result[29]).toBe('FizzBuzz'); // 30
        });

        test('debe verificar múltiples casos de Fizz', () => {
            const result = fizzBuzz(10);
            expect(result[2]).toBe('Fizz'); // 3
            expect(result[5]).toBe('Fizz'); // 6
            expect(result[8]).toBe('Fizz'); // 9
        });

        test('debe verificar múltiples casos de Buzz', () => {
            const result = fizzBuzz(10);
            expect(result[4]).toBe('Buzz'); // 5
            expect(result[9]).toBe('Buzz'); // 10
        });
    });

    describe('fizzBuzzString', () => {
        test('debe retornar string con resultados separados por salto de línea', () => {
            const result = fizzBuzzString(3);
            expect(result).toBe('1\n2\nFizz');
        });

        test('debe manejar secuencia completa correctamente', () => {
            const result = fizzBuzzString(5);
            expect(result).toBe('1\n2\nFizz\n4\nBuzz');
        });

        test('debe manejar FizzBuzz en formato string', () => {
            const result = fizzBuzzString(15);
            expect(result.split('\n')[14]).toBe('FizzBuzz');
        });

        test('debe manejar caso límite de 1', () => {
            const result = fizzBuzzString(1);
            expect(result).toBe('1');
        });
    });
});
