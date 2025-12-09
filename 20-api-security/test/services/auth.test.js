const bcrypt = require('bcrypt');
const { authenticate } = require('../../src/middleware/auth');
const config = require('../../src/config');

const makeRes = () => {
  const res = {};
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (payload) => {
    res.body = payload;
    return res;
  };
  return res;
};

describe('Middleware authenticate', () => {
  test('rechaza cuando falta token', async () => {
    const req = { headers: {} };
    const res = makeRes();
    const next = jest.fn();
    await authenticate(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  test('acepta token válido y adjunta user', async () => {
    const token = await bcrypt.hash(config.app.secretMessage, 10);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = makeRes();
    const next = jest.fn();
    await authenticate(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
  });
});
