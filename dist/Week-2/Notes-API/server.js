import express from 'express';
import { Router } from '@/Week-2/Notes-API/routes/noteRoutes.js';
import { errorHandler, notFoundHandler } from '@/Week-2/Notes-API/middleware/errorMiddleware.js';
import { requestLogger } from '@/Week-2/Notes-API/middleware/loggerMiddleware.js';
import { logger } from '@/Week-2/Notes-API/utils/logger.js';
import config from '@/Week-2/Notes-API/config/env.js';
export class Server {
    constructor() {
        this.storage = {
            notes: [],
            nextId: 1,
        };
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();
    }
    setupMiddleware() {
        this.app.use(express.json());
        this.app.use(requestLogger);
    }
    setupRoutes() {
        // Initialize Router with app and storage
        const router = new Router(this.app, this.storage);
        router.setupRoutes();
    }
    setupErrorHandling() {
        this.app.use(notFoundHandler);
        this.app.use(errorHandler);
    }
    start() {
        this.app.listen(config.port, () => {
            logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
        });
    }
}
//# sourceMappingURL=server.js.map