import config from '../config/env.js';

export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

export const logger = {
  info: (message: string, meta?: object) => {
    console.info(`[${new Date().toISOString()}] [INFO] ${message}`, meta || '');
  },
  warn: (message: string, meta?: object) => {
    console.warn(`[${new Date().toISOString()}] [WARN] ${message}`, meta || '');
  },
  error: (message: string, meta?: object) => {
    console.error(`[${new Date().toISOString()}] [ERROR] ${message}`, meta || '');
  },
  debug: (message: string, meta?: object) => {
    if (config.isDevelopment) {
      // eslint-disable-next-line no-console
      console.debug(`[${new Date().toISOString()}] [DEBUG] ${message}`, meta || '');
    }
  },
};
