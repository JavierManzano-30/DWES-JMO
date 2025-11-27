const request = require('supertest');
const app = require('../../src/app');

describe('Ruta /ping', () => {
  test('devuelve pong', async () => {
    const res = await request(app).get('/ping');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'pong' });
  });
});
