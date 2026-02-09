import { buildTransportOptions } from '../../src/services/email.js';

describe('Email service', () => {
  test('buildTransportOptions devuelve host/port para SMTP local', () => {
    const options = buildTransportOptions({
      host: '127.0.0.1',
      port: 1025,
      secure: false,
      user: '',
      pass: '',
      service: '',
    });

    expect(options).toEqual({
      host: '127.0.0.1',
      port: 1025,
      secure: false,
    });
  });

  test('buildTransportOptions devuelve configuracion de service cuando se define', () => {
    const options = buildTransportOptions({
      host: '',
      port: 0,
      secure: true,
      user: 'user@test.com',
      pass: 'secret',
      service: 'gmail',
    });

    expect(options.service).toBe('gmail');
    expect(options.auth.user).toBe('user@test.com');
    expect(options.auth.pass).toBe('secret');
  });
});
