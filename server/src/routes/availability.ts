import { Router, Request, Response, NextFunction } from 'express';
import { fetchManufacturerAvailability } from '../services/dataFetcher';
import logger from '../utils/logger';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const availability = await fetchManufacturerAvailability('juuran');
    res.send(availability);
  } catch (err) {
    logger.error(err);
    return next(err);
  }
});

export const route = router;
