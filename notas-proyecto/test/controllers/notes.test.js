const request = require('supertest');
const app = require('../../src/app');

describe('GET /notes (functional)', () => {
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
