const express = require('express');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const routes = require('../routes');

const apiDocPath = path.join(__dirname, '..', '..', 'openapi.yml');
const apiDoc = yaml.load(fs.readFileSync(apiDocPath, 'utf8'));

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDoc));
  app.get('/openapi.json', (_req, res) => res.json(apiDoc));

  app.use('/', routes);

  app.use((_req, res) => {
    res.status(404).send({ message: 'Not Found' });
  });

  app.use((err, _req, res) => {
    console.error(err);
    res.status(500).json({ message: 'Unexpected error', detail: err.message });
  });
};
