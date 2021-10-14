import fetch, { Request } from 'cross-fetch';
import { Product } from '../../types/products';
import { buildReqHeaders, getApiUrl, handleErrors } from '../../utils/http';

/**
 * Returns a list of Product info by category.
 * @param {string} category The category of which products are queried.
 * @returns {Promise<Stock[]>} A promise with a list of product stock
 */
export async function fetchProducts(category: string): Promise<Product[]> {
  const headers = buildReqHeaders();
  const req = new Request(`${getApiUrl()}/products/${category}`, { method: 'GET', headers });
  const res = await fetch(req);

  if (res.status !== 200) {
    throw await handleErrors(res);
  }
  return await res.json();
}
