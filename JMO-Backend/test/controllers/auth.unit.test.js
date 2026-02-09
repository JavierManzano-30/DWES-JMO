import { jest } from '@jest/globals';

const queryMock = jest.fn();
const hashMock = jest.fn();
const compareMock = jest.fn();
const signTokenMock = jest.fn();

jest.unstable_mockModule('../../src/db/pool.js', () => ({
  default: {
    query: queryMock,
  },
}));

jest.unstable_mockModule('bcryptjs', () => ({
  default: {
    hash: hashMock,
    compare: compareMock,
  },
}));

jest.unstable_mockModule('../../src/utils/auth.js', () => ({
  signToken: signTokenMock,
}));

const { register, login } = await import('../../src/controllers/authController.js');

function createRes() {
  return {
    status: jest.fn(function status() {
      return this;
    }),
    json: jest.fn(),
  };
}

describe('auth controller unit', () => {
  beforeEach(() => {
    queryMock.mockReset();
    hashMock.mockReset();
    compareMock.mockReset();
    signTokenMock.mockReset();
  });

  test('register detecta usuario existente', async () => {
    queryMock.mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 1 }] });

    await expect(
      register(
        { body: { username: 'usuario_ok', email: 'ok@test.com', password: '12345678' } },
        createRes()
      )
    ).rejects.toMatchObject({ status: 409, code: 'USER_EXISTS' });
  });

  test('register valida comunidad inexistente', async () => {
    queryMock
      .mockResolvedValueOnce({ rowCount: 0, rows: [] })
      .mockResolvedValueOnce({ rowCount: 0, rows: [] });

    await expect(
      register(
        {
          body: {
            username: 'usuario_ok',
            email: 'ok@test.com',
            password: '12345678',
            community_id: '4',
          },
        },
        createRes()
      )
    ).rejects.toMatchObject({ status: 400, code: 'VALIDATION_ERROR' });
  });

  test('register crea usuario y token', async () => {
    queryMock
      .mockResolvedValueOnce({ rowCount: 0, rows: [] })
      .mockResolvedValueOnce({
        rows: [{ id: 7, username: 'demo', email: 'demo@test.com', role: 'user', community_id: null }],
      });
    hashMock.mockResolvedValue('hashed');
    signTokenMock.mockReturnValue('token-123');

    const res = createRes();
    await register(
      { body: { username: 'demo', email: 'DEMO@test.com', password: '12345678' } },
      res
    );

    expect(hashMock).toHaveBeenCalledWith('12345678', 10);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      token: 'token-123',
      user: expect.objectContaining({ id: 7, username: 'demo', email: 'demo@test.com' }),
    });
  });

  test('login devuelve 401 si no existe email', async () => {
    queryMock.mockResolvedValue({ rowCount: 0, rows: [] });

    await expect(
      login({ body: { email: 'x@test.com', password: '123' } }, createRes())
    ).rejects.toMatchObject({ status: 401, code: 'AUTH_REQUIRED' });
  });

  test('login devuelve 401 si password incorrecto', async () => {
    queryMock.mockResolvedValue({
      rowCount: 1,
      rows: [{ id: 1, email: 'x@test.com', username: 'x', password_hash: 'h', role: 'user' }],
    });
    compareMock.mockResolvedValue(false);

    await expect(
      login({ body: { email: 'x@test.com', password: 'bad' } }, createRes())
    ).rejects.toMatchObject({ status: 401, code: 'AUTH_REQUIRED' });
  });

  test('login devuelve token si credenciales correctas', async () => {
    queryMock.mockResolvedValue({
      rowCount: 1,
      rows: [{ id: 1, email: 'x@test.com', username: 'x', password_hash: 'h', role: 'admin' }],
    });
    compareMock.mockResolvedValue(true);
    signTokenMock.mockReturnValue('token-login');
    const res = createRes();

    await login({ body: { email: 'x@test.com', password: 'ok' } }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: 'token-login',
      user: expect.objectContaining({ id: 1, email: 'x@test.com', role: 'admin' }),
    });
  });
});
