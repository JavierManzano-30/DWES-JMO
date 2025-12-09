const request = require('supertest');
const app = require('../../src/app');

describe('GET /notes (functional)', () => {
  test('responde 200 con metadatos de paginado', async () => {
    const res = await request(app).get('/notes');
    expect(res.status).toBe(200);
    expect(res.body.value.length).toBeGreaterThan(0);
    expect(res.body).toHaveProperty('totalItems');
    expect(res.body).toHaveProperty('totalPages');
  });

  test('filtra por categoría y texto en contenido', async () => {
    const res = await request(app).get('/notes').query({ category: 'work', contentContains: 'logs' });
    expect(res.status).toBe(200);
    expect(res.body.value.every((n) => n.category === 'work')).toBe(true);
  });

  test('ordena por tamaño ascendente', async () => {
    const res = await request(app).get('/notes').query({ sortBy: 'size', sortDir: 'asc' });
    expect(res.status).toBe(200);
    const { value } = res.body;
    for (let i = 1; i < value.length; i += 1) {
      expect(value[i].size >= value[i - 1].size).toBe(true);
    }
  });
});
