import { Router } from 'express';
import * as xml2js from 'xml2js';
import logger from './logger';

type Wrapper = (router: Router) => void;

export const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router): void => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};

export const parseXML = async (xml: string): Promise<unknown> => {
  try {
    return await xml2js.parseStringPromise(xml);
  } catch (err) {
    logger.error('Failed to parse xml');
    throw err;
  }
};
