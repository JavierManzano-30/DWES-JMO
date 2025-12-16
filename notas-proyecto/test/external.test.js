const request = require('supertest');
const app = require('../src/app');

describe('GET /external/fact', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ fact: 'Gatos duermen 16 horas.' }),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('devuelve el fact del servicio externo', async () => {
    const res = await request(app).get('/external/fact');
    expect(res.status).toBe(200);
    expect(res.body.fact).toMatch(/Gatos/);
    expect(global.fetch).toHaveBeenCalled();
  });
});
