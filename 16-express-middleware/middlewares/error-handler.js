/**
 * Middleware para el control de errores
 * Devuelve un error 500 con el mensaje 'Server Error'
 */
export const errorHandler = (err, req, res, next) => {
  // Log del error (opcional, para debugging)
  console.error('Error capturado:', err);
  
  // Devolver error 500 con el mensaje 'Server Error'
  res.status(500).json({
    error: 'Server Error'
  });
};

