import express from 'express';
import morgan from 'morgan';

import router from '../routes/index.js';
import { errorHandler, logRequestMiddleware } from '../middlewares/basic-middleware.js';

// eslint-disable-next-line no-unused-vars
export default function expressLoader(app, config) {
  app.use(morgan(':method :url :status - :response-time ms'));
  app.use(logRequestMiddleware);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(router);

  app.use(errorHandler);
}
