import { Request, Response, NextFunction } from 'express';

// Custom error class with status code
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handler middleware
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Default error values
  let statusCode = 500;
  let message = 'Internal server error';
  let stack: string | undefined = undefined;

  // Handle known AppErrors
  if ('statusCode' in err) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === 'SyntaxError') {
    statusCode = 400;
    message = 'Invalid JSON';
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  }

  // Include stack trace in development only
  if (process.env.NODE_ENV === 'development') {
    stack = err.stack;
  }

  // Log error for server side
  console.error(`[ERROR] ${statusCode} - ${message}`);
  if (stack) console.error(stack);

  // Send response
  res.status(statusCode).json({
    status: 'error',
    message,
    ...(stack && { stack }),
    timestamp: new Date().toISOString(),
  });
};

// 404 Not Found handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const err = new AppError(`Route not found: ${req.originalUrl}`, 404);
  next(err);
};
