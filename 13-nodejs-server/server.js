import http from 'http';

const PORT = 4000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello World!</h1>');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
