export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' ? { error: err.message } : {})
    });
};
// 404 middleware - for routes that don't exist
export const notFound = (req, res, next) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};
