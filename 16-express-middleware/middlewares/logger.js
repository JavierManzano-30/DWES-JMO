/**
 * Middleware logger que imprime las peticiones con diferentes niveles según el código de estado HTTP
 * - 2XX -> info
 * - 4XX -> warn
 * - 5XX -> error
 */
export const loggerMiddleware = (req, res, next) => {
  // Capturar el código de estado cuando la respuesta termine de enviarse
  res.on('finish', () => {
    logResponse(req, res.statusCode);
  });
  
  next();
};

/**
 * Función auxiliar para loggear según el código de estado
 */
function logResponse(req, statusCode) {
  const method = req.method;
  const url = req.url;
  const timestamp = new Date().toISOString();
  
  // Determinar el nivel de log según el código de estado
  if (statusCode >= 200 && statusCode < 300) {
    // 2XX - info
    console.info(`[INFO] ${timestamp} ${method} ${url} - Status: ${statusCode}`);
  } else if (statusCode >= 400 && statusCode < 500) {
    // 4XX - warn
    console.warn(`[WARN] ${timestamp} ${method} ${url} - Status: ${statusCode}`);
  } else if (statusCode >= 500) {
    // 5XX - error
    console.error(`[ERROR] ${timestamp} ${method} ${url} - Status: ${statusCode}`);
  } else {
    // Otros códigos
    console.log(`[LOG] ${timestamp} ${method} ${url} - Status: ${statusCode}`);
  }
}

