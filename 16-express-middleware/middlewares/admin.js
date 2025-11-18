/**
 * Middleware que valida el acceso a una zona restringida para usuarios admin
 * Requiere el parámetro 'password' en la cabecera con el valor 'patata'
 */
export const adminMiddleware = (req, res) => {
  const password = req.headers.password;
  
  // Verificar si el password es correcto
  if (password === 'patata') {
    // Acceso correcto: enviar mensaje de bienvenida con código 200 OK
    return res.status(200).send('Bienvenid@, disfrute del contenido');
  }
  
  // Acceso incorrecto: devolver error 401
  res.status(401).json({
    code: 401,
    error: 'Unauthorized',
    message: "Acceso restringido, por favor, incluya la palabra secreta en el parámetro 'password' en la cabecera de la petición"
  });
};

