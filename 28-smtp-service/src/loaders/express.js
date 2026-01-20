const express = require('express');
const routes = require('../routes');

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/', routes);

  app.use((_req, res) => {
    res.status(404).send({ message: 'Not Found' });
  });

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: 'Unexpected error', detail: err.message });
  });
};
