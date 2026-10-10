import cors from 'cors';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config.js'
import routes from './routes.js';




// Configuração para emular o __dirname usando ES Modules (já que você usa import)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products-file', express.static(resolve(__dirname, '..', 'uploads')));
app.use(
  '/categories-file',
  express.static(resolve(__dirname, '..', 'uploads')),
);

app.use(express.urlencoded({ extended: true }));

app.use(routes);

export default app;
