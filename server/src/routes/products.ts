import { Router, Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: return products
    logger.debug('products called');
    res.status(200).end();
  } catch (err) {
    return next(err);
  }
});

export const route = router;
