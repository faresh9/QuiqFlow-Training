import express, { Application } from 'express';
import { NoteStorage } from '@/Week-2/Notes-API/interfaces/Note.js';
import { Router } from '@/Week-2/Notes-API/routes/noteRoutes.js';
import { errorHandler, notFoundHandler } from '@/Week-2/Notes-API/middleware/errorMiddleware.js';
import { requestLogger } from '@/Week-2/Notes-API/middleware/loggerMiddleware.js';
import { logger } from '@/Week-2/Notes-API/utils/logger.js';
import config from '@/Week-2/Notes-API/config/env.js';

export class Server {
  private app: Application;
  private storage: NoteStorage = {
    notes: [],
    nextId: 1,
  };

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(requestLogger);
  }

  private setupRoutes(): void {
    // Initialize Router with app and storage
    const router = new Router(this.app, this.storage);
    router.setupRoutes();
  }

  private setupErrorHandling(): void {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public start(): void {
    this.app.listen(config.port, () => {
      logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
    });
  }
}
