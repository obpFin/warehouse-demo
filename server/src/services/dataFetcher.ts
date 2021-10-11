import fetch, { Request } from 'cross-fetch';

import { addForceErrorHeader, buildReqHeaders, getApiUrl, handleErrors } from '../utils/http';

/**
 * Returns a list of availability info.
 * @param {string} manufacturer The manufacturer which availability is queried.
 * @param {boolean} forceError If true, a header is added to simulate erroneus call to api.
 * @returns {Promise<unknown>} A promise with a list of availability
 */
export async function fetchManufacturerAvailability(manufacturer: string, forceError = false): Promise<unknown> {
  const headers = forceError ? addForceErrorHeader(buildReqHeaders()) : buildReqHeaders();
  const req = new Request(`${getApiUrl()}/availability/${manufacturer}`, { method: 'GET', headers });
  const res = await fetch(req);

  if (res.status !== 200) {
    throw await handleErrors(res);
  }
  return await res.json();
}
