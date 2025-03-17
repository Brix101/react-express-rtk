import type { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import deserializeUser from '../middleware/deserialize-user';

export default function createApp(): Express {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(deserializeUser);

  app.get('/api/status', (_req, res) => {
    res.json({ ok: true });
  });

  return app;
}
