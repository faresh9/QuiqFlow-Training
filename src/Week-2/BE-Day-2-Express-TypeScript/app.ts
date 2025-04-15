import express from 'express';
import noteRoutes from './routes/noteRoutes.js';


const app = express();

// Middleware
app.use(express.json());


// Routes
app.use('/notes', noteRoutes);



export default app;