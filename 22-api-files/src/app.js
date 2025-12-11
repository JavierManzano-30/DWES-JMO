const express = require('express');
const path = require('path');
const fs = require('fs');
const routes = require('./routes');
const { app: appConfig } = require('./config');

if (!fs.existsSync(appConfig.filesDir)) {
  fs.mkdirSync(appConfig.filesDir, { recursive: true });
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// servir archivos de forma estandar (GET /files/<nombre>)
app.use('/files', express.static(appConfig.filesDir, {
  dotfiles: 'deny',
  fallthrough: false,
}));

app.use('/', routes);

// download dedicado para forzar attachment
app.get('/download/:name', (req, res, next) => {
  const filePath = path.join(appConfig.filesDir, req.params.name);
  return res.download(filePath, (err) => {
    if (err) next(err);
  });
});

app.use((err, req, res, _next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'Fichero demasiado grande' });
  }
  if (err.code === 'ENOENT') {
    return res.status(404).json({ message: 'Fichero no encontrado' });
  }
  return res.status(500).json({ message: 'Error interno', error: err.message });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
