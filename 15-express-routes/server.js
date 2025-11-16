import express from 'express';

const app = express();
const PORT = 3000;

// Middleware para parsear JSON y URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Ruta /header - Recoger token del header
app.get('/header', (req, res) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      code: 401,
      error: 'Unauthorized',
      message: 'Error: Set a token to login'
    });
  }

  console.log('Token recibido:', token);
  res.json({ message: 'Token recibido correctamente', token });
});

// 2. Ruta /params/:name - Parámetro en la ruta
app.get('/params/:name', (req, res) => {
  const { name } = req.params;
  res.send(`Hola ${name}`);
});

// 3. Ruta /query - Suma de números desde 1 hasta n
app.get('/query', (req, res) => {
  const n = req.query.n ? Number(req.query.n) : 100;

  if (Number.isNaN(n) || n < 1) {
    return res.status(400).json({
      error: 'El parámetro n debe ser un número positivo'
    });
  }

  // Suma de 1 hasta n: n * (n + 1) / 2
  const suma = (n * (n + 1)) / 2;
  res.json({ n, suma });
});

// 4. Ruta /body - Mostrar objeto entrante en lista HTML
app.post('/body', (req, res) => {
  const body = req.body;

  // Función para convertir valores a string (maneja objetos y arrays)
  const valueToString = (value) => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  let html = '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Body Parameters</title>\n</head>\n<body>\n  <h1>Parámetros recibidos:</h1>\n  <ul>\n';
  
  for (const [key, value] of Object.entries(body)) {
    const valueStr = valueToString(value);
    html += `    <li><strong>${key}:</strong> <pre>${valueStr}</pre></li>\n`;
  }
  
  html += '  </ul>\n</body>\n</html>';

  res.type('html').send(html);
});

// 5. Router para /animals
const animalsRouter = express.Router();

animalsRouter.get('/dog', (_req, res) => {
  res.json({ grow: 'guau guau' });
});

animalsRouter.get('/cat', (_req, res) => {
  res.json({ grow: 'miau' });
});

animalsRouter.get('/bird', (_req, res) => {
  res.json({ grow: 'pio pio' });
});

app.use('/animals', animalsRouter);

// 6. Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    error: 'Not Found',
    message: 'Error: Path not found'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}/`);
});

