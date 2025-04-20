import { logger } from '../utils/logger.js';
import config from '../config/env.js';
export var ErrorType;
(function (ErrorType) {
    ErrorType["VALIDATION"] = "VALIDATION_ERROR";
    ErrorType["NOT_FOUND"] = "NOT_FOUND";
    ErrorType["BAD_REQUEST"] = "BAD_REQUEST";
    ErrorType["INTERNAL"] = "INTERNAL_ERROR";
})(ErrorType || (ErrorType = {}));
// Custom error class with status code and type
export class AppError extends Error {
    constructor(message, statusCode, type = ErrorType.INTERNAL) {
        super(message);
        this.statusCode = statusCode;
        this.type = type;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
        Object.setPrototypeOf(this, AppError.prototype);
    }
    static badRequest(message) {
        return new AppError(message, 400, ErrorType.BAD_REQUEST);
    }
    static validation(message) {
        return new AppError(message, 400, ErrorType.VALIDATION);
    }
    static notFound(message) {
        return new AppError(message, 404, ErrorType.NOT_FOUND);
    }
}
// Error handler middleware
export const errorHandler = (err, req, res, _next) => {
    // Create base error response
    const errorResponse = {
        status: 'error',
        message: 'Internal server error',
        timestamp: new Date().toISOString(),
        // @ts-expect-error Extending Express Request
        requestId: req.id, // Include request ID in responses
    };
    // Handle AppError instances
    if (err instanceof AppError) {
        errorResponse.message = err.message;
        res.status(err.statusCode);
    }
    // Handle native Error objects
    else if (err instanceof Error) {
        // Additional handling for specific error types
        if (err.name === 'SyntaxError') {
            res.status(400);
            errorResponse.message = 'Invalid JSON syntax';
        }
        else {
            res.status(500);
            errorResponse.message = config.isDevelopment ? err.message : 'Internal server error';
        }
    }
    // Handle other types of errors
    else {
        res.status(500);
    }
    // Add stack trace in development mode
    if (config.isDevelopment) {
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
export const notFoundHandler = (req, _res, next) => {
    const err = AppError.notFound(`Route not found: ${req.originalUrl}`);
    next(err);
};
//# sourceMappingURL=errorMiddleware.js.map