// Custom error class with status code
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
// Error handler middleware
export const errorHandler = (err, req, res, _next) => {
    // Default error values
    let statusCode = 500;
    let message = 'Internal server error';
    let stack = undefined;
    // Handle known AppErrors
    if ('statusCode' in err) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err.name === 'SyntaxError') {
        statusCode = 400;
        message = 'Invalid JSON';
    }
    else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    }
    // Include stack trace in development only
    if (process.env.NODE_ENV === 'development') {
        stack = err.stack;
    }
    // Log error for server side
    console.error(`[ERROR] ${statusCode} - ${message}`);
    if (stack)
        console.error(stack);
    // Send response
    res.status(statusCode).json({
        status: 'error',
        message,
        ...(stack && { stack }),
        timestamp: new Date().toISOString(),
    });
};
// 404 Not Found handler
export const notFoundHandler = (req, res, next) => {
    const err = new AppError(`Route not found: ${req.originalUrl}`, 404);
    next(err);
};
//# sourceMappingURL=errorMiddleware.js.map