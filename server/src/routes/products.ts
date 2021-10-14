import { Router, Request, Response, NextFunction } from 'express';
import Cache from '../services/cache';
import { fetchProducts } from '../services/dataFetcher/products';
import { Product } from '../types/products';
import logger from '../utils/logger';

const router = Router();

// /api/products/:category
router.get('/:category', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = req.params.category;
    let products: Product[] | undefined | null = Cache.get<Product[]>(category);

    if (!products) {
      products = await fetchProducts(category);
      Cache.set(category, products);
    }

    if (!products || !products.length) {
      return res.status(400).send(`Failed to fetch stock from  ${category}`);
    }

    res.send(products);
  } catch (err) {
    logger.error(err);
    return next(err);
  }
});

export const route = router;
