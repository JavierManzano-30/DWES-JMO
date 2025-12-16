/* eslint-env jest */
const request = require('supertest');
const app = require('../../src/app');
const { resetNotes, notes } = require('../../src/services/notes');

describe('GET /notes (functional)', () => {
  beforeEach(() => resetNotes());

  test('retorna lista paginada por defecto', async () => {
    const res = await request(app).get('/notes');
    expect(res.status).toBe(200);
    expect(res.body.value.length).toBeGreaterThan(0);
    expect(res.body.totalItems).toBeGreaterThan(0);
  });

  test('filtra y ordena por tamano ascendente', async () => {
    const res = await request(app)
      .get('/notes')
      .query({ category: 'work', contentContains: 'logs', sortBy: 'size', sortDir: 'asc' });
    expect(res.status).toBe(200);
    expect(res.body.value.every((n) => n.category === 'work')).toBe(true);
    const sizes = res.body.value.map((n) => n.size);
    expect([...sizes].sort((a, b) => a - b)).toEqual(sizes);
  });
});

describe('CRUD /notes', () => {
  beforeEach(() => resetNotes());

  test('crea una nota nueva', async () => {
    const res = await request(app).post('/notes').send({
      title: 'Nota HTTP',
      content: 'Creada via POST',
      category: 'personal',
    });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Nota HTTP');
    expect(res.body.id).toBeGreaterThan(notes.length - 1);
  });

  test('rechaza creacion sin campos obligatorios', async () => {
    const res = await request(app).post('/notes').send({ title: '' });
    expect(res.status).toBe(400);
  });

  test('actualiza una nota existente', async () => {
    const resCreate = await request(app).post('/notes').send({
      title: 'Original',
      content: 'v1',
    });
    const resUpdate = await request(app).put(`/notes/${resCreate.body.id}`).send({ content: 'v2' });
    expect(resUpdate.status).toBe(200);
    expect(resUpdate.body.content).toBe('v2');
  });

  test('devuelve 404 al actualizar nota inexistente', async () => {
    const res = await request(app).put('/notes/9999').send({ content: 'nada' });
    expect(res.status).toBe(404);
  });

  test('elimina una nota', async () => {
    const resCreate = await request(app).post('/notes').send({
      title: 'Para borrar',
      content: 'bye',
    });
    const resDelete = await request(app).delete(`/notes/${resCreate.body.id}`);
    expect(resDelete.status).toBe(204);
  });
});
