const bcrypt = require('bcrypt');
const config = require('../config');

const extractToken = (req) => {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  if (req.headers['x-access-token']) {
    return String(req.headers['x-access-token']);
  }
  if (req.query.token) {
    return String(req.query.token);
  }
  return null;
};

const resolveRole = (req) => {
  const role = req.headers['x-role'] || req.query.role;
  if (!role) return 'vip';
  return String(role).toLowerCase();
};

async function authenticate(req, res, next) {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  try {
    const valid = await bcrypt.compare(config.app.secretMessage, token);
    if (!valid) {
      return res.status(403).json({ message: 'Token invalido' });
    }
    req.user = { role: resolveRole(req) };
    return next();
  } catch (err) {
    return next(err);
  }
}

function requireRole(expectedRole) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({ message: 'Falta autenticacion previa' });
    }
    if (req.user.role !== expectedRole) {
      return res.status(403).json({ message: 'No tienes permisos suficientes' });
    }
    return next();
  };
}

module.exports = { authenticate, requireRole };
