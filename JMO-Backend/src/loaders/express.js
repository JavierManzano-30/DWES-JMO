import express from 'express';
import cors from 'cors';
import path from 'node:path';
import config from '../config.js';
import apiRoutes from '../routes/index.js';
import { errorHandler } from '../middleware/errorHandler.js';

export default (app) => {
  app.use(
    cors({
      origin: config.cors.origins && config.cors.origins.length > 0 ? config.cors.origins : true,
      credentials: config.cors.credentials,
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.get('/api/v1/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use('/api/v1', apiRoutes);

  app.use((_req, res) => {
    res.status(404).json({
      code: 'NOT_FOUND',
      message: 'Recurso no encontrado',
      details: [],
    });
  });

  app.use(errorHandler);
};
