import express from 'express';
import { HttpError } from '../utils/httpError';
import { route as productsRoute } from './products';

export const router = express.Router();

router.use('/products', productsRoute);

router.get('*', (req, res, next) => {
  next(new HttpError(404, 'route_not_found', req.url));
});

export const routes = router;
