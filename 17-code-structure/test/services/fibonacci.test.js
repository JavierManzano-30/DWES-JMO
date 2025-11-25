const { fibonacci } = require('../../src/services/fibonacci');

describe('Servicio fibonacci', () => {
  test('devuelve 0 para n=0', () => {
    expect(fibonacci(0)).toBe(0);
  });

  test('devuelve 1 para n=1', () => {
    expect(fibonacci(1)).toBe(1);
  });

  test('devuelve 21 para n=8', () => {
    expect(fibonacci(8)).toBe(21);
  });

  test('devuelve null para n negativo', () => {
    expect(fibonacci(-1)).toBeNull();
  });
});
