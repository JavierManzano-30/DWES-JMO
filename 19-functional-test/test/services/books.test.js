const { queryBooks, books } = require('../../src/services/books');

describe('Servicio queryBooks', () => {
  test('devuelve top por defecto y total', () => {
    const { value, count } = queryBooks({});
    expect(value.length).toBeGreaterThan(0);
    expect(value.length).toBeLessThanOrEqual(10);
    expect(count).toBe(books.length);
  });

  test('ordena y filtra números', () => {
    const { value } = queryBooks({ filter: 'rating gt 4.6', orderby: 'rating desc' });
    expect(value.every((book) => book.rating > 4.6)).toBe(true);
  });

  test('respeta skip y top', () => {
    const { value } = queryBooks({ top: 2, skip: 1, orderby: 'id asc' });
    expect(value.length).toBeLessThanOrEqual(2);
  });
});
