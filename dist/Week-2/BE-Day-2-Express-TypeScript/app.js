import express from 'express';
import noteRoutes from './routes/noteRoutes.js';
import { errorHandler } from './middleware/error.js';
import { requestLogger } from './middleware/loggerMiddleware.js';
const app = express();
// Middleware
app.use(express.json());
app.use(requestLogger);
// Routes
app.use('/notes', noteRoutes);
// Error handling middleware (must be last)
app.use(errorHandler);
export default app;
