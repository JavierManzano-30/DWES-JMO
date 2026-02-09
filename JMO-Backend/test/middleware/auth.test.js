import { jest } from '@jest/globals';

const verifyMock = jest.fn();

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    verify: verifyMock,
  },
}));

const { authenticate, optionalAuth } = await import('../../src/middleware/auth.js');

describe('auth middleware', () => {
  beforeEach(() => {
    verifyMock.mockReset();
  });

  test('authenticate falla sin token', () => {
    const next = jest.fn();
    authenticate({ headers: {} }, {}, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0].status).toBe(401);
    expect(next.mock.calls[0][0].code).toBe('AUTH_REQUIRED');
  });

  test('authenticate acepta token valido', () => {
    verifyMock.mockReturnValue({ id: 10, role: 'user' });
    const req = { headers: { authorization: 'Bearer token-ok' } };
    const next = jest.fn();

    authenticate(req, {}, next);

    expect(req.user).toEqual({ id: 10, role: 'user' });
    expect(next).toHaveBeenCalledWith();
  });

  test('authenticate falla con token invalido', () => {
    verifyMock.mockImplementation(() => {
      throw new Error('bad token');
    });
    const next = jest.fn();

    authenticate({ headers: { authorization: 'Bearer bad' } }, {}, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0].status).toBe(401);
  });

  test('optionalAuth sigue sin token', () => {
    const req = { headers: {} };
    const next = jest.fn();

    optionalAuth(req, {}, next);

    expect(req.user).toBeUndefined();
    expect(next).toHaveBeenCalledWith();
  });

  test('optionalAuth guarda usuario con token valido', () => {
    verifyMock.mockReturnValue({ id: 2 });
    const req = { headers: { authorization: 'Bearer token-ok' } };
    const next = jest.fn();

    optionalAuth(req, {}, next);

    expect(req.user).toEqual({ id: 2 });
    expect(next).toHaveBeenCalledWith();
  });

  test('optionalAuth pone user=null con token invalido', () => {
    verifyMock.mockImplementation(() => {
      throw new Error('bad token');
    });
    const req = { headers: { authorization: 'Bearer bad' } };
    const next = jest.fn();

    optionalAuth(req, {}, next);

    expect(req.user).toBeNull();
    expect(next).toHaveBeenCalledWith();
  });
});
