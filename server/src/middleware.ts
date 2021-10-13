import { Router, urlencoded, json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from './routes';

const handleCors = (router: Router): Router => {
  return router.use(cors({ credentials: true, origin: true }));
};

const handleBodyRequestParsing = (router: Router): void => {
  router.use(urlencoded({ extended: true }));
  router.use(json());
};

const handleHelmet = (router: Router): void => {
  router.use(helmet());
};

const handleRoutes = (router: Router): void => {
  router.use('/api', routes);
};

export const middleware = [handleCors, handleHelmet, handleBodyRequestParsing, handleRoutes];
