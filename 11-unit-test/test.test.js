import { sumar } from './index.js';
import { helloWorld } from './index.js';
import { test, expect } from 'vitest';

describe('Suma function', () => {
    test('Suma correctamente', () => {
        expect(sumar(1, 2)).toBe(3);
    });
    test('Suma correctamente', () => {
        expect(sumar(10, 20)).toBe(30);
    });
    test('Suma correctamente', () => {
        expect(sumar(-1, 2)).toBe(1);
    });
    test('Suma correctamente', () => {
        expect(sumar(1, -2)).toBe(-1);
    });

});

describe('Hello World function', () => {
    test('Hello World correctamente', () => {
        expect(helloWorld('Juan')).toBe('Hello Juan');
    });
    test('Hello World correctamente', () => {
        expect(helloWorld()).toBe('Hello World');
    });
});
