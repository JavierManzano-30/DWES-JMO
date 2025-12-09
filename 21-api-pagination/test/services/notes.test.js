const { listNotes, notes } = require('../../src/services/notes');
const config = require('../../src/config');

describe('Servicio listNotes', () => {
  test('aplica paginado por defecto', () => {
    const result = listNotes({});
    expect(result.value.length).toBeLessThanOrEqual(config.app.pageSize);
    expect(result.totalItems).toBe(notes.length);
    expect(result.totalPages).toBeGreaterThan(0);
  });

  test('filtra por título y categoría', () => {
    const result = listNotes({ filters: { titleContains: 'plan', category: 'personal' } });
    expect(result.value.every((n) => n.title.toLowerCase().includes('plan') && n.category === 'personal')).toBe(true);
  });

  test('ordena por updatedAt desc por defecto', () => {
    const result = listNotes({});
    const { value } = result;
    for (let i = 1; i < value.length; i += 1) {
      const prev = new Date(value[i - 1].updatedAt).getTime();
      const current = new Date(value[i].updatedAt).getTime();
      expect(prev >= current).toBe(true);
    }
  });

  test('respeta page y pageSize', () => {
    const result = listNotes({ pagination: { page: 2, pageSize: 2 }, sort: { by: 'createdAt', dir: 'asc' } });
    expect(result.page).toBe(2);
    expect(result.pageSize).toBe(2);
    expect(result.value.length).toBeLessThanOrEqual(2);
  });
});
