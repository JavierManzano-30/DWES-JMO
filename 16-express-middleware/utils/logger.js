import winston from 'winston';

/**
 * Logger con winston configurado con múltiples niveles y formato con colores
 * Formato: [Fecha] nivel: Mensaje
 */
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true })
      )
    })
  ]
});

// Métodos de conveniencia para diferentes niveles
export const logInfo = (message) => logger.info(message);
export const logWarn = (message) => logger.warn(message);
export const logError = (message) => logger.error(message);
export const logDebug = (message) => logger.debug(message);

