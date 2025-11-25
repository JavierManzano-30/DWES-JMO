import express from 'express';

import { init } from './loaders/index.js';
import { app as appConfig } from './config.js';

const app = express();
init(app, appConfig);

export default app;
