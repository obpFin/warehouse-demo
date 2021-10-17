import path from 'path';
import express, { Router, urlencoded, json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from './routes';

const handleFrontEnd = (router: Router): void => {
  router.use(express.static(path.resolve(__dirname, '../app/build')));
};

const handleCors = (router: Router): Router => {
  return router.use(cors({ credentials: true, origin: true }));
};

const handleBodyRequestParsing = (router: Router): void => {
  router.use(urlencoded({ extended: true }));
  router.use(json());
};

const handleHelmet = (router: Router): void => {
  router.use(helmet({ contentSecurityPolicy: false }));
};

const handleRoutes = (router: Router): void => {
  router.use('/api', routes);
  router.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../app/build', 'index.html'));
  });
};

export const middleware = [handleFrontEnd, handleCors, handleHelmet, handleBodyRequestParsing, handleRoutes];
