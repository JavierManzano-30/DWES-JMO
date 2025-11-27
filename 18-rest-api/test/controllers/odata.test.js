const request = require('supertest');
const app = require('../../src/app');

describe('GET /odata/books', () => {
  test('devuelve listado por defecto con metadatos', async () => {
    const res = await request(app).get('/odata/books');
    expect(res.statusCode).toBe(200);
    expect(res.body.value.length).toBeGreaterThan(0);
    expect(res.body.count).toBeGreaterThan(0);
  });

  test('aplica filtro y proyección', async () => {
    const res = await request(app).get('/odata/books').query({
      $filter: 'rating gt 4.6',
      $select: 'title,rating',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.value.every((b) => b.title && b.rating)).toBe(true);
    expect(res.body.count).toBeGreaterThanOrEqual(res.body.value.length);
  });
});

describe('GET /', () => {
  test('devuelve mensaje informativo', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });
});
