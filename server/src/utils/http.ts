import { Headers } from 'cross-fetch';

export const buildReqHeaders = (): Headers => {
  const headers = new Headers();
  headers.set('Content-type', 'application/json');
  return headers;
};

export const withForceErrorHeader = (headers: Headers): Headers => {
  if (process.env.SET_ERROR_HEADER) {
    headers.set('x-force-error-mode', 'all');
  }
  return headers;
};

export const getApiUrl = (): string | undefined => {
  return process.env.API_URL;
};

export const handleErrors = async (res: Response): Promise<Error> => {
  console.log('new Error');
  if (res.headers.get('Content-type')?.startsWith('application/json')) {
    const { error, description } = await res.json();
    console.log('error, description', error, description);
    return new Error(`${error}: ${description}`);
  }
  console.log('error, description', res.status);

  return new Error('Http Error ' + res.status);
};
