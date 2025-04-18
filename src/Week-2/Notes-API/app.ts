import express from 'express';
import noteRoutes from './routes/noteRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';
import { requestLogger } from './middleware/loggerMiddleware.js';


const app = express();

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/notes', noteRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
