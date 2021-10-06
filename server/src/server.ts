import express from 'express';
import middleware from './middleware';
import { applyMiddleware } from './utils';
import logger from './utils/logger';

process.on('uncaughtException', (e) => {
  logger.log('error', e.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.debug('error', reason);
  process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);

const { PORT = 3000 } = process.env;
router.listen(PORT, () => logger.info(`Server is running http://localhost:${PORT}...`));
