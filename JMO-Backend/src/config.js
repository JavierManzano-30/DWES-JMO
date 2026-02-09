import 'dotenv/config';

function toNumber(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
  : null;

const config = {
  app: {
    port: toNumber(process.env.PORT, 3000),
  },
  db: {
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/proyecto',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'dev_secret_change_me',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  cors: {
    origins: corsOrigins,
    credentials: process.env.CORS_CREDENTIALS === 'true',
  },
  smtp: {
    host: process.env.SMTP_HOST || '127.0.0.1',
    port: toNumber(process.env.SMTP_PORT, 1025),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    service: process.env.SMTP_SERVICE || '',
    from: process.env.SMTP_FROM || 'no-reply@snapnation.local',
  },
};

export default config;
