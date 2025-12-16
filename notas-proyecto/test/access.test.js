const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../src/app');
const config = require('../src/config');

let validToken;

beforeAll(async () => {
  validToken = await bcrypt.hash(config.app.secretMessage, 10);
});

describe('Access endpoints', () => {
  test('GET /public devuelve acceso abierto', async () => {
    const res = await request(app).get('/public');
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/publica/i);
  });

  test('GET /vip sin token devuelve 401', async () => {
    const res = await request(app).get('/vip');
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/token requerido/i);
  });

  test('GET /vip con token invalido devuelve 403', async () => {
    const invalidToken = await bcrypt.hash('otro secreto', 10);
    const res = await request(app).get('/vip').set('Authorization', `Bearer ${invalidToken}`);
    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/token invalido/i);
  });

  test('GET /vip con token valido devuelve rol vip', async () => {
    const res = await request(app).get('/vip').set('Authorization', `Bearer ${validToken}`);
    expect(res.status).toBe(200);
    expect(res.body.role).toBe('vip');
  });

  test('GET /vip usando x-access-token tambien funciona', async () => {
    const res = await request(app).get('/vip').set('x-access-token', validToken);
    expect(res.status).toBe(200);
    expect(res.body.role).toBe('vip');
  });

  test('GET /admin con token valido pero sin rol admin devuelve 403', async () => {
    const res = await request(app).get('/admin').set('Authorization', `Bearer ${validToken}`);
    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/permisos/i);
  });

  test('GET /admin con rol admin devuelve 200', async () => {
    const res = await request(app)
      .get('/admin')
      .set('Authorization', `Bearer ${validToken}`)
      .set('x-role', 'admin');
    expect(res.status).toBe(200);
    expect(res.body.role).toBe('admin');
  });
});

describe('Docs y 404', () => {
  test('GET /openapi.json devuelve la especificacion', async () => {
    const res = await request(app).get('/openapi.json');
    expect(res.status).toBe(200);
    expect(res.body.info.title).toBe('Bloc de notas API');
  });

  test('Ruta inexistente devuelve 404', async () => {
    const res = await request(app).get('/ruta-que-no-existe');
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });
});
