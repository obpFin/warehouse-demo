import fetch, { Request } from 'cross-fetch';
import { Stock } from '../../types/products';
import { withForceErrorHeader, buildReqHeaders, getApiUrl, handleErrors } from '../../utils/http';

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
  const headers = withForceErrorHeader(buildReqHeaders());
  const req = new Request(`${getApiUrl()}/availability/${manufacturer}`, { method: 'GET', headers });
  const res = await fetch(req);

  if (res.status !== 200) {
    throw await handleErrors(res);
  }
  return await res.json();
}