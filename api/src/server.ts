import type { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

export function createServer(): Express {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.get('/status', (_req, res) => {
    res.json({ ok: true });
  });

  return app;
}
