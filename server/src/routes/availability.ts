import { Router, Request, Response, NextFunction } from 'express';
import { Availability, IManufacturerAvailability } from '../types/products';
import { parseXML } from '../utils';
import logger from '../utils/logger';
import Cache from '../services/cache';
import { fetchManufacturerAvailability, StockResponse } from '../services/dataFetcher/availability';

const router = Router();

type ManufacturerAvailabilityPayload = IManufacturerAvailability & StockResponse;
type AvailabilityPayload = {
  AVAILABILITY: Availability;
};

async function fetchManufacturerAvailabilityWithRetry(manufacturer: string, limit = 2) {
  if (limit === 0) {
    return undefined;
  }
  const proxiedProducts = (await fetchManufacturerAvailability(manufacturer)) as ManufacturerAvailabilityPayload;
  if (proxiedProducts.code !== 200 || !Array.isArray(proxiedProducts?.response)) {
    return fetchManufacturerAvailabilityWithRetry(manufacturer, limit - 1);
  }
  return proxiedProducts;
}

// /api/availability/:manufacturer
router.get('/:manufacturer', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const manufacturer = req.params.manufacturer;
    let productsStock = Cache.get<{ id: string; stock: string }[]>(manufacturer);

    if (!productsStock) {
      logger.info(`${manufacturer} not found from cache, fetching...`);
      try {
        const proxiedProducts = (await fetchManufacturerAvailabilityWithRetry(
          manufacturer,
        )) as ManufacturerAvailabilityPayload;

        if (!proxiedProducts) {
          const message = `${manufacturer} Failed to fetch stock from  ${manufacturer}`;
          logger.warn(message);
          return res.status(400).send(message);
        }

        const parsedProductStocks = await Promise.all(
          proxiedProducts?.response.map(async (p) => {
            const { AVAILABILITY } = (await parseXML(p.DATAPAYLOAD)) as AvailabilityPayload;
            return AVAILABILITY.CODE[0] == '200' ? { id: p.id, stock: AVAILABILITY.INSTOCKVALUE[0] } : null;
          }),
        );
        productsStock = parsedProductStocks;
        Cache.set(manufacturer, parsedProductStocks);
      } catch (err) {
        next(err);
      }
    }
    res.send(productsStock);
  } catch (err) {
    logger.error(err);
    return next(err);
  }
});

export const route = router;
