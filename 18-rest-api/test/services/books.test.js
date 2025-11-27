const { queryBooks, books } = require('../../src/services/books');

describe('Servicio queryBooks', () => {
  test('devuelve top por defecto y total correcto', () => {
    const { value, count } = queryBooks({});
    expect(value.length).toBeGreaterThan(0);
    expect(value.length).toBeLessThanOrEqual(10);
    expect(count).toBe(books.length);
  });

  test('filtra por número y ordena descendente', () => {
    const { value } = queryBooks({ filter: 'rating gt 4.6', orderby: 'rating desc' });
    expect(value.every((book) => book.rating > 4.6)).toBe(true);
    const ratings = value.map((b) => b.rating);
    const sorted = [...ratings].sort((a, b) => b - a);
    expect(ratings).toEqual(sorted);
  });

  test('paginación respeta skip y top', () => {
    const { value } = queryBooks({ top: 2, skip: 3, orderby: 'id asc' });
    expect(value.length).toBeLessThanOrEqual(2);
    if (value.length === 2) {
      expect(value[0].id).toBe(4);
      expect(value[1].id).toBe(5);
    }
  });

  test('proyecta campos seleccionados', () => {
    const { value } = queryBooks({ select: 'title,author' });
    value.forEach((book) => {
      expect(Object.keys(book).sort()).toEqual(['author', 'title']);
    });
  });
});
