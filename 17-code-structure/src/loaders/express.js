const express = require('express');
const routes = require('../routes');

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/', routes);

  app.use((req, res) => {
    res.status(404).send({ message: 'Not Found' });
  });
};
