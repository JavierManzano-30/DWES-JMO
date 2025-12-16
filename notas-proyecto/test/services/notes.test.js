const {
  listNotes,
  notes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
  resetNotes,
} = require('../../src/services/notes');

beforeEach(() => resetNotes());

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

describe('CRUD notas (servicio)', () => {
  test('crea y recupera una nota', () => {
    const created = createNote({ title: 'Nueva', content: 'Algo', category: 'ideas' });
    expect(created.id).toBeGreaterThan(notes.length - 1);
    const found = getNote(created.id);
    expect(found.title).toBe('Nueva');
  });

  test('actualiza una nota existente', () => {
    const created = createNote({ title: 'Editar', content: 'v1' });
    const updated = updateNote(created.id, { content: 'v2' });
    expect(updated.content).toBe('v2');
    expect(updated.updatedAt).not.toBe(created.updatedAt);
  });

  test('elimina una nota', () => {
    const created = createNote({ title: 'Borrar', content: 'tmp' });
    const deleted = deleteNote(created.id);
    expect(deleted).toBe(true);
    expect(getNote(created.id)).toBeNull();
  });
});
