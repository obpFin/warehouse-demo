import express from 'express';
import dotenv from 'dotenv';
import { middleware } from './middleware';
import { applyMiddleware } from './utils';
import logger from './utils/logger';

process.on('uncaughtException', (e) => {
  logger.error('error', e.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.debug('error', reason);
  process.exit(1);
});

dotenv.config({ path: './server/src/.env' });

const router = express();
applyMiddleware(middleware, router);

const { PORT = 8000 } = process.env;
router.listen(PORT, () => logger.info(`Server is running http://localhost:${PORT}...`));
