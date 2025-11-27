const request = require('supertest');
const app = require('../../src/app');

describe('Functional /odata/books', () => {
  test('responde 200 con listado por defecto', async () => {
    const res = await request(app).get('/odata/books');
    expect(res.statusCode).toBe(200);
    expect(res.body.value.length).toBeGreaterThan(0);
  });

  test('aplica filtro y proyección', async () => {
    const res = await request(app)
      .get('/odata/books')
      .query({ $filter: 'author eq Asimov', $select: 'title,author' });
    expect(res.statusCode).toBe(200);
    expect(res.body.value.every((b) => b.title && b.author)).toBe(true);
  });
});
