import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

export enum ErrorType {
  VALIDATION = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  BAD_REQUEST = 'BAD_REQUEST',
  INTERNAL = 'INTERNAL_ERROR',
}

// Custom error class with status code and type
export class AppError extends Error {
  readonly statusCode: number;
  readonly type: ErrorType;
  readonly isOperational: boolean;

  constructor(message: string, statusCode: number, type: ErrorType = ErrorType.INTERNAL) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static badRequest(message: string): AppError {
    return new AppError(message, 400, ErrorType.BAD_REQUEST);
  }

  static validation(message: string): AppError {
    return new AppError(message, 400, ErrorType.VALIDATION);
  }

  static notFound(message: string): AppError {
    return new AppError(message, 404, ErrorType.NOT_FOUND);
  }
}

// Error handler middleware
export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  // Create base error response
  const errorResponse = {
    status: 'error',
    message: 'Internal server error',
    timestamp: new Date().toISOString(),
    // @ts-expect-error Extending Express Request
    requestId: req.id,
  };

  // Handle AppError instances
  if (err instanceof AppError) {
    errorResponse.message = err.message;
    res.status(err.statusCode);
  }
  // Handle native Error objects
  else if (err instanceof Error) {
    if (err.name === 'SyntaxError') {
      res.status(400);
      errorResponse.message = 'Invalid JSON syntax';
    } else if (
      err.name === 'SequelizeValidationError' ||
      err.name === 'SequelizeUniqueConstraintError'
    ) {
      res.status(400);
      errorResponse.message = err.message;
    } else {
      res.status(500);
      errorResponse.message =
        process.env.NODE_ENV !== 'production' ? err.message : 'Internal server error';
    }
  }
  // Handle other types of errors
  else {
    res.status(500);
  }

  // Add stack trace in development mode
  if (process.env.NODE_ENV !== 'production') {
    const stack = err instanceof Error ? err.stack : undefined;
    if (stack) {
      Object.assign(errorResponse, { stack });
    }
  }

  // Log the error
  logger.error(`${req.method} ${req.path}: ${errorResponse.message}`);

  res.json(errorResponse);
};

// 404 Not Found handler
export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  const routeEmojis = {
    '/api/users': '👤',
    '/api/rooms': '🚪',
    '/api/messages': '💬',
  };

  // Find matching emoji prefix or use default
  const emoji =
    Object.entries(routeEmojis).find(([prefix]) => req.originalUrl.startsWith(prefix))?.[1] || '🔍';

  const err = AppError.notFound(`${emoji} Route not found: ${req.originalUrl}`);
  next(err);
};
