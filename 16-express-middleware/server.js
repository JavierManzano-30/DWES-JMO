import express from 'express';
import morgan from 'morgan';
import { loggerMiddleware } from './middlewares/logger.js';
import { adminMiddleware } from './middlewares/admin.js';
import { errorHandler } from './middlewares/error-handler.js';
import { logger } from './utils/logger.js';

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan para mostrar todos los accesos a la API por consola
app.use(morgan('combined', {
  stream: {
    write: (message) => {
      logger.info(message.trim());
    }
  }
}));

// Middleware logger (debe ir antes de las rutas para capturar todas las respuestas)
app.use(loggerMiddleware);

// Ruta pública
app.get('/', (_req, res) => {
  res.json({ message: 'Ruta pública - Acceso libre' });
});

// Ruta con código 2XX (éxito)
app.get('/success', (_req, res) => {
  res.status(200).json({ message: 'Operación exitosa' });
});

// Ruta con código 4XX (cliente error)
app.get('/client-error', (_req, res) => {
  res.status(400).json({ error: 'Error del cliente' });
});

// Ruta con código 5XX (servidor error)
app.get('/server-error', (_req, res) => {
  res.status(500).json({ error: 'Error del servidor' });
});

// Ruta protegida con middleware admin
app.get('/admin', adminMiddleware);

// Ruta para probar el logger winston
app.get('/test-logger', (_req, res) => {
  logger.info('Mensaje de información');
  logger.warn('Mensaje de advertencia');
  logger.error('Mensaje de error');
  logger.debug('Mensaje de debug');
  res.json({ message: 'Logs enviados a consola' });
});

// Ruta para probar el error handler
app.get('/test-error', (_req, res, next) => {
  next(new Error('Error de prueba'));
});

// Middleware de manejo de errores (debe ir al final, después de todas las rutas)
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Servidor Express escuchando en http://localhost:${PORT}/`);
});

