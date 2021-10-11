import { Headers } from 'cross-fetch';

export const buildReqHeaders = (): Headers => {
  const headers = new Headers();
  headers.set('Content-type', 'application/json');
  return headers;
};

export const addForceErrorHeader = (headers: Headers): Headers => {
  headers.set('x-force-error-mode', 'all');
  return headers;
};

export const getApiUrl = (): string | undefined => {
  return process.env.API_URL;
};

export const handleErrors = async (res: Response): Promise<Error> => {
  if (res.headers.get('Content-type')?.startsWith('application/json')) {
    const { error, description } = await res.json();
    return new Error(`${error}: ${description}`);
  }
  return new Error('Http Error ' + res.status);
};
