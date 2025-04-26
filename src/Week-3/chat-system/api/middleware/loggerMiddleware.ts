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

    // Add emojis based on HTTP method
    const methodEmojis: Record<string, string> = {
      GET: '🔍',
      POST: '➕',
      PUT: '🔄',
      PATCH: '🩹',
      DELETE: '🗑️',
    };

    // Add emojis based on status code
    let statusEmoji = '';
    if (res.statusCode >= 500)
      statusEmoji = '🔥'; // Server error
    else if (res.statusCode >= 400)
      statusEmoji = '⚠️'; // Client error
    else if (res.statusCode >= 300)
      statusEmoji = '↪️'; // Redirect
    else if (res.statusCode >= 200) statusEmoji = '✅'; // Success

    const methodEmoji = methodEmojis[req.method] || '🔌';

    logger.info(
      `[${requestId}] ${methodEmoji} ${req.method} ${req.url} ${statusEmoji} ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};
