import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import 'dotenv/config';

import routes from './routes.js';

// Configuração para emular o __dirname usando ES Modules (já que você usa import)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);
app.use(express.json());

app.use('/products-file', express.static(resolve(__dirname, '..', 'uploads')));
app.use(
  '/categories-file',
  express.static(resolve(__dirname, '..', 'uploads')),
);

app.use(express.urlencoded({ extended: true }));

app.use(routes);

export default app;
