import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HELLO_WORLD_PORT = 4000;
const APP_PORT = 3000;

const helloWorldApp = express();

helloWorldApp.get('/', (_req, res) => {
  res.send('Hello World from Express!');
});

helloWorldApp.listen(HELLO_WORLD_PORT, () => {
  console.log(`Hello World Express server listening at http://localhost:${HELLO_WORLD_PORT}/`);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  console.info(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

const loadHtml = async (fileName) => {
  const filePath = path.join(__dirname, 'views', fileName);
  return readFile(filePath, 'utf-8');
};

app.get('/', (_req, res) => {
  res.type('html').send(`<h1>Express Multi-route Server</h1>
<p>Available routes:</p>
<ul>
  <li><code>/page</code></li>
  <li><code>/error</code></li>
  <li><code>/hello?name=Ada</code></li>
  <li><code>/fizzbuzz?number=15</code></li>
  <li><code>/books</code> (GET, POST)</li>
  <li><code>/users/:userId/books/:bookId</code></li>
  <li><code>/about.html</code> (served from <code>public</code>)</li>
</ul>`);
});

app.get('/page', async (_req, res, next) => {
  try {
    const html = await loadHtml('page.html');
    res.type('html').send(html);
  } catch (error) {
    next(error);
  }
});

app.get('/error', async (_req, res, next) => {
  try {
    const html = await loadHtml('error.html');
    res.status(404).type('html').send(html);
  } catch (error) {
    next(error);
  }
});

app.get('/hello', (req, res) => {
  const name = req.query.name;

  if (!name) {
    res.status(400).type('text').send('Missing query parameter "name". Example: /hello?name=Ada');
    return;
  }

  res.type('text').send(`Hello ${name}!`);
});

app.get('/fizzbuzz', (req, res) => {
  const numberParam = req.query.number;
  const limit = Number(numberParam);

  if (!numberParam || Number.isNaN(limit) || limit < 1) {
    res
      .status(400)
      .type('text')
      .send('Provide a positive integer query parameter "number". Example: /fizzbuzz?number=15');
    return;
  }

  const sequence = Array.from({ length: limit }, (_, index) => {
    const value = index + 1;
    if (value % 15 === 0) return 'fizzbuzz';
    if (value % 3 === 0) return 'fizz';
    if (value % 5 === 0) return 'buzz';
    return String(value);
  }).join(', ');

  res.type('text').send(sequence);
});

app.get('/books', (_req, res) => {
  res.json([
    { id: 1, title: 'Clean Code' },
    { id: 2, title: 'Node.js Design Patterns' },
  ]);
});

app.post('/books', (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ error: 'Missing "title" in request body.' });
    return;
  }

  res.status(201).json({
    message: 'Book created (demo response)',
    book: { id: Date.now(), title },
  });
});

app.get('/users/:userId/books/:bookId', (req, res) => {
  const { userId, bookId } = req.params;
  res.json({ userId, bookId, message: 'Route params demo from Express docs.' });
});

app.all('/secret', (_req, res) => {
  res.status(403).send('Access denied (demonstrating app.all from Express docs).');
});

app.use((req, res) => {
  res.status(404).type('text').send('Express route not found.');
});

app.use((error, _req, res, next) => {
  console.error('Unhandled Express error:', error);
  if (res.headersSent) {
    next(error);
    return;
  }
  res.status(500).type('text').send('Internal Server Error');
});

app.listen(APP_PORT, () => {
  console.log(`Express multi-route server listening at http://localhost:${APP_PORT}/`);
});