import jwt from 'jsonwebtoken';
import { createError } from '../utils/errors.js';
import config from '../config.js';

export function authenticate(req, _res, next) {
  const header = req.headers.authorization || '';
  const [, token] = header.split(' ');

  if (!token) {
    return next(createError(401, 'AUTH_REQUIRED', 'Token no presente o inválido'));
  }

  try {
    const payload = jwt.verify(token, config.jwt.secret);
    req.user = payload;
    return next();
  } catch (error) {
    return next(createError(401, 'AUTH_REQUIRED', 'Token no presente o inválido'));
  }
}

export function optionalAuth(req, _res, next) {
  const header = req.headers.authorization || '';
  const [, token] = header.split(' ');

  if (!token) {
    return next();
  }

  try {
    req.user = jwt.verify(token, config.jwt.secret);
  } catch (error) {
    req.user = null;
  }

  return next();
}
