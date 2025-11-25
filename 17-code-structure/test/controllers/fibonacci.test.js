const request = require('supertest');
const app = require('../../src/app');

describe('Controlador getFibonacci', () => {
  test('responde 400 si n no es un número', async () => {
    const res = await request(app).get('/fibonacci?n=hola');
    expect(res.statusCode).toBe(400);
  });

  test('responde 400 si n es negativo', async () => {
    const res = await request(app).get('/fibonacci?n=-5');
    expect(res.statusCode).toBe(400);
  });

  test('responde 200 y el valor correcto', async () => {
    const res = await request(app).get('/fibonacci?n=8');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(21);
  });
});
