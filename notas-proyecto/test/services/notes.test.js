const { listNotes, notes } = require('../../src/services/notes');

describe('listNotes (servicio)', () => {
  test('devuelve todas las notas por defecto con metadatos', () => {
    const result = listNotes({});
    expect(result.totalItems).toBe(notes.length);
    expect(result.value.length).toBeGreaterThan(0);
    expect(result.applied.sort.by).toBe('updatedAt');
  });

  test('filtra por categoria y contenido', () => {
    const result = listNotes({
      filters: { category: 'work', contentContains: 'logs' },
    });
    expect(result.value.every((n) => n.category === 'work')).toBe(true);
    expect(result.value.every((n) => n.content.toLowerCase().includes('logs'))).toBe(true);
  });

  test('ordena por tamano ascendente', () => {
    const result = listNotes({ sort: { by: 'size', dir: 'asc' } });
    const sizes = result.value.map((n) => n.size);
    expect([...sizes].sort((a, b) => a - b)).toEqual(sizes);
  });
});
