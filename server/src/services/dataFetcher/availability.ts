import fetch, { Request } from 'cross-fetch';
import { Stock } from '../../types/products';
import { withForceErrorHeader, buildReqHeaders, getApiUrl } from '../../utils/http';
import logger from '../../utils/logger';

export type StockResponse = {
  code?: number;
  response?: Stock[];
};

/**
 * Returns a list of availability info.
 * @param {string} manufacturer The manufacturer which availability is queried.
 * @returns {Promise<Stock[]>} A promise with a list of product stock
 */
export async function fetchManufacturerAvailability(manufacturer: string): Promise<StockResponse> {
  try {
    const headers = withForceErrorHeader(buildReqHeaders());
    const req = new Request(`${getApiUrl()}/availability/${manufacturer}`, { method: 'GET', headers });
    const res = await fetch(req);
    if (res.status !== 200) {
      throw `No data found from ${manufacturer}`;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    logger.error('error: ', err);
  }
}
