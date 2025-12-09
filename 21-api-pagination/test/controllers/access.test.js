const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../../src/app');
const config = require('../../src/config');

let token;

beforeAll(async () => {
  token = await bcrypt.hash(config.app.secretMessage, 10);
});

describe('Rutas de acceso acumuladas', () => {
  test('GET /public responde sin token', async () => {
    const res = await request(app).get('/public');
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/pública/i);
  });

  test('GET /vip exige token válido', async () => {
    const resNoAuth = await request(app).get('/vip');
    expect(resNoAuth.status).toBe(401);

    const resOk = await request(app).get('/vip').set('Authorization', `Bearer ${token}`);
    expect(resOk.status).toBe(200);
    expect(resOk.body.message).toMatch(/VIP/i);
  });

  test('GET /admin exige token y rol admin', async () => {
    const resNoToken = await request(app).get('/admin');
    expect(resNoToken.status).toBe(401);

    const resWrongRole = await request(app)
      .get('/admin')
      .set('Authorization', `Bearer ${token}`);
    expect(resWrongRole.status).toBe(403);

    const resAdmin = await request(app)
      .get('/admin')
      .set('Authorization', `Bearer ${token}`)
      .set('x-role', 'admin');
    expect(resAdmin.status).toBe(200);
    expect(resAdmin.body.role).toBe('admin');
  });
});
