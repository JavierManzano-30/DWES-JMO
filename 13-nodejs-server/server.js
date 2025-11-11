import http from 'http';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HELLO_WORLD_PORT = 4000;
const MULTI_ROUTE_PORT = 3000;

const sendResponse = (res, { statusCode = 200, headers = {}, body = '' }) => {
  res.writeHead(statusCode, headers);
  res.end(body);
};

const loadHtml = async (fileName) => {
  const htmlPath = path.join(__dirname, fileName);
  return readFile(htmlPath, 'utf-8');
};

const helloWorldServer = http.createServer((_req, res) => {
  sendResponse(res, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    body: '<h1>Hello World!</h1>',
  });
});

helloWorldServer.listen(HELLO_WORLD_PORT, () => {
  console.log(`Hello World server running at http://localhost:${HELLO_WORLD_PORT}/`);
});

const multiRouteServer = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url ?? '/', `http://${req.headers.host}`);
  const { pathname, searchParams } = parsedUrl;

  try {
    switch (pathname) {
      case '/':
        sendResponse(res, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
          body: `<h1>NodeJS Multi-route Server</h1>
<p>Try the routes: /page, /error, /hello?name=YourName, /fizzbuzz?number=15</p>`,
        });
        break;
      case '/page': {
        const pageHtml = await loadHtml('page.html');
        sendResponse(res, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
          body: pageHtml,
        });
        break;
      }
      case '/error': {
        const errorHtml = await loadHtml('error.html');
        sendResponse(res, {
          statusCode: 404,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
          body: errorHtml,
        });
        break;
      }
      case '/hello': {
        const name = searchParams.get('name');
        if (!name) {
          sendResponse(res, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            body: 'Missing query parameter "name". Example: /hello?name=Ada',
          });
          break;
        }
        sendResponse(res, {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          body: `Hello ${name}!`,
        });
        break;
      }
      case '/fizzbuzz': {
        const numberParam = searchParams.get('number');
        const limit = Number(numberParam);

        if (!numberParam || Number.isNaN(limit) || limit < 1) {
          sendResponse(res, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            body: 'Provide a positive integer query parameter "number". Example: /fizzbuzz?number=15',
          });
          break;
        }

        const sequence = Array.from({ length: limit }, (_, index) => {
          const value = index + 1;
          if (value % 15 === 0) return 'fizzbuzz';
          if (value % 3 === 0) return 'fizz';
          if (value % 5 === 0) return 'buzz';
          return String(value);
        }).join(', ');

        sendResponse(res, {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          body: sequence,
        });
        break;
      }
      default:
        sendResponse(res, {
          statusCode: 404,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          body: 'Route not found',
        });
    }
  } catch (error) {
    console.error('Server error:', error);
    sendResponse(res, {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: 'Internal Server Error',
    });
  }
});

multiRouteServer.listen(MULTI_ROUTE_PORT, () => {
  console.log(`Multi-route server running at http://localhost:${MULTI_ROUTE_PORT}/`);
});
