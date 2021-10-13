import * as express from 'express';
import { HttpError } from '../utils/httpError';
import { route as productsRoute } from './products';
import { route as availabilityRoute } from './availability';

export const router = express.Router();

router.use('/products', productsRoute);
router.use('/availability', availabilityRoute);

router.get('*', (req, res, next) => {
  next(new HttpError(404, 'route_not_found', req.url));
});

export const routes = router;
