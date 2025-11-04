import { describe, test, expect } from 'vitest';
import { flexibleFizzBuzz, flexibleFizzBuzzString } from './ejercicio3.js';

describe('Ejercicio 3: FizzBuzz flexible con condiciones dinámicas', () => {
    describe('flexibleFizzBuzz', () => {
        test('debe retornar números normales cuando no hay condiciones', () => {
            const result = flexibleFizzBuzz(5, {});
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        test('debe manejar condiciones básicas correctamente', () => {
            const conditions = {
                2: 'poo',
                3: 'fizz',
                5: 'buzz',
                7: 'bar',
            };

            const result = flexibleFizzBuzz(10, conditions);

            expect(result[1]).toBe('poo'); // 2
            expect(result[2]).toBe('fizz'); // 3
            expect(result[4]).toBe('buzz'); // 5
            expect(result[6]).toBe('bar'); // 7
        });

        test('debe combinar palabras cuando hay múltiples divisores (poofizz para 6)', () => {
            const conditions = {
                2: 'poo',
                3: 'fizz',
                5: 'buzz',
                7: 'bar',
            };

            const result = flexibleFizzBuzz(10, conditions);

            expect(result[5]).toBe('poofizz'); // 6 es divisible por 2 y 3
        });

        test('debe combinar fizzbuzz para 15', () => {
            const conditions = {
                2: 'poo',
                3: 'fizz',
                5: 'buzz',
                7: 'bar',
            };

            const result = flexibleFizzBuzz(20, conditions);

            expect(result[14]).toBe('fizzbuzz'); // 15 es divisible por 3 y 5
        });

        test('debe manejar el caso completo hasta 100 con las condiciones especificadas', () => {
            const conditions = {
                2: 'poo',
                3: 'fizz',
                5: 'buzz',
                7: 'bar',
            };

            const result = flexibleFizzBuzz(100, conditions);

            expect(result).toHaveLength(100);
            expect(result[5]).toBe('poofizz'); // 6
            expect(result[14]).toBe('fizzbuzz'); // 15
            expect(result[20]).toBe('fizzbar'); // 21 es divisible por 3 y 7
        });

        test('debe manejar correctamente combinaciones múltiples', () => {
            const conditions = {
                2: 'poo',
                3: 'fizz',
                5: 'buzz',
                7: 'bar',
            };

            const result = flexibleFizzBuzz(30, conditions);

            // 6 = 2*3 -> poofizz
            expect(result[5]).toBe('poofizz');
            // 10 = 2*5 -> poobuzz
            expect(result[9]).toBe('poobuzz');
            // 14 = 2*7 -> poobar
            expect(result[13]).toBe('poobar');
            // 15 = 3*5 -> fizzbuzz
            expect(result[14]).toBe('fizzbuzz');
            // 21 = 3*7 -> fizzbar
            expect(result[20]).toBe('fizzbar');
            // 30 = 2*3*5 -> poofizzbuzz
            expect(result[29]).toBe('poofizzbuzz');
        });

        test('debe manejar condiciones con un solo divisor', () => {
            const conditions = {
                2: 'even',
            };

            const result = flexibleFizzBuzz(5, conditions);

            expect(result).toEqual([1, 'even', 3, 'even', 5]);
        });

        test('debe ordenar condiciones por divisor ascendente', () => {
            const conditions = {
                5: 'buzz',
                2: 'poo',
                3: 'fizz',
            };

            const result = flexibleFizzBuzz(10, conditions);

            // 6 debe ser poofizz (no fizzpoo) porque 2 < 3
            expect(result[5]).toBe('poofizz');
            // 10 debe ser poobuzz (no buzzpoo) porque 2 < 5
            expect(result[9]).toBe('poobuzz');
        });

        test('debe ignorar valores no numéricos en las keys', () => {
            const conditions = {
                2: 'poo',
                3: 'fizz',
                invalid: 'should-be-ignored',
                5: 'buzz',
            };

            const result = flexibleFizzBuzz(10, conditions);

            // Verificar que funciona correctamente
            expect(result[4]).toBe('buzz'); // 5
            expect(result[5]).toBe('poofizz'); // 6
        });

        test('debe convertir palabras a string', () => {
            const conditions = {
                2: 123, // número convertido a string
                3: 'fizz',
            };

            const result = flexibleFizzBuzz(6, conditions);

            expect(result[1]).toBe('123'); // 2
            expect(result[5]).toBe('123fizz'); // 6
        });

        test('debe lanzar error si n no es entero positivo', () => {
            expect(() => flexibleFizzBuzz(0, {})).toThrow('El número debe ser un entero positivo');
            expect(() => flexibleFizzBuzz(-1, {})).toThrow('El número debe ser un entero positivo');
            expect(() => flexibleFizzBuzz(1.5, {})).toThrow(
                'El número debe ser un entero positivo'
            );
        });

        test('debe lanzar error si conditions no es un objeto', () => {
            expect(() => flexibleFizzBuzz(10, null)).toThrow('Las condiciones deben ser un objeto');
            expect(() => flexibleFizzBuzz(10, [])).toThrow('Las condiciones deben ser un objeto');
            expect(() => flexibleFizzBuzz(10, 'invalid')).toThrow(
                'Las condiciones deben ser un objeto'
            );
        });

        test('debe manejar condiciones con divisores grandes', () => {
            const conditions = {
                10: 'ten',
                20: 'twenty',
            };

            const result = flexibleFizzBuzz(30, conditions);

            expect(result[9]).toBe('ten'); // 10
            expect(result[19]).toBe('tentwenty'); // 20 es divisible por 10 y 20
            expect(result[29]).toBe('ten'); // 30 es divisible por 10 pero no por 20
        });

        test('debe manejar max = 1', () => {
            const conditions = {
                2: 'poo',
                3: 'fizz',
            };

            const result = flexibleFizzBuzz(1, conditions);

            expect(result).toEqual([1]);
        });

        test('debe manejar el ejemplo específico del ejercicio', () => {
            const n = 100;
            const conditions = {
                2: 'poo',
                3: 'fizz',
                5: 'buzz',
                7: 'bar',
            };

            const result = flexibleFizzBuzz(n, conditions);

            expect(result).toHaveLength(100);
            // Verificar casos específicos mencionados
            expect(result[5]).toBe('poofizz'); // 6
            expect(result[14]).toBe('fizzbuzz'); // 15
        });
    });

    describe('flexibleFizzBuzzString', () => {
        test('debe retornar string con resultados separados por salto de línea', () => {
            const conditions = {
                2: 'poo',
                3: 'fizz',
            };

            const result = flexibleFizzBuzzString(6, conditions);

            expect(result).toBe('1\npoo\nfizz\npoo\n5\npoofizz');
        });

        test('debe manejar condiciones completas en formato string', () => {
            const conditions = {
                2: 'poo',
                3: 'fizz',
                5: 'buzz',
            };

            const result = flexibleFizzBuzzString(10, conditions);

            expect(result.split('\n')[5]).toBe('poofizz'); // 6
            expect(result.split('\n')[9]).toBe('poobuzz'); // 10
        });
    });
});
