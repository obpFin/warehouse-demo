import { Router, Request, Response, NextFunction } from 'express';
import { fetchManufacturerAvailability } from '../services/dataFetcher';
import { Availability } from '../types/products';
import { parseXML } from '../utils';
import logger from '../utils/logger';

const router = Router();

interface AvailabilityPayload {
  AVAILABILITY: Availability;
}

router.get('/:manufacturer', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const manufacturer = req.params.manufacturer;
    const productsStock = await fetchManufacturerAvailability(manufacturer);

    if (productsStock.code !== 200 || !Array.isArray(productsStock.response)) {
      return res.status(400).send(`Failed to fetch stock from  ${manufacturer}`);
    }

    const parsedProductStocks = await Promise.allSettled(
      productsStock.response.map(async (p) => {
        const { AVAILABILITY } = (await parseXML(p.DATAPAYLOAD)) as AvailabilityPayload;
        return AVAILABILITY.CODE[0] == '200' ? { id: p.id, stock: AVAILABILITY.INSTOCKVALUE[0] } : null;
      }),
    );

    res.send(parsedProductStocks);
  } catch (err) {
    logger.error(err);
    return next(err);
  }
});

export const route = router;
