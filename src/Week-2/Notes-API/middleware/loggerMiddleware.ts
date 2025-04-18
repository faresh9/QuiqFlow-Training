import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';
import { randomUUID } from 'crypto';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const requestId = randomUUID().slice(0, 8);
  // @ts-expect-error Extending Express Request 
  req.id = requestId;
  
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`[${requestId}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};


