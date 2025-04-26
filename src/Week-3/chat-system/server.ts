import express, { Application } from 'express';
import { requestLogger } from './api/middleware/loggerMiddleware.js';
import { errorHandler, notFoundHandler } from './api/middleware/errorMiddleware.js';
import { logger } from './api/utils/logger.js';
import SequelizeInstance from './config/SequelizeInstance.js';
import { UserRouter } from './api/routes/userRoutes.js';
import { RoomRouter } from './api/routes/roomRoutes.js';
import { MessageRouter } from './api/routes/messageRoutes.js';
import { UserService } from './api/services/userService.js';
import { RoomService } from './api/services/roomService.js';
import { MessageService } from './api/services/messageService.js';
import { UserController } from './api/controllers/userController.js';
import { RoomController } from './api/controllers/roomController.js';
import { MessageController } from './api/controllers/messageController.js';

export class Server {
  private app: Application;
  private port: number;

  constructor(port: number = 3000) {
    this.app = express();
    this.port = port;

    // Initialize the database
    this.initializeDatabase();

    // Setup middleware
    this.setupMiddleware();

    // Setup routes
    this.setupRoutes();

    // Setup error handling
    this.setupErrorHandling();
  }

  private async initializeDatabase() {
    try {
      const sequelize = SequelizeInstance.getInstance();
      await sequelize.authenticate();
      logger.info('Database connection established successfully');
      await sequelize.sync();
      logger.info('Database models synchronized');
    } catch (error) {
      logger.error('Unable to connect to the database:');
      process.exit(1);
    }
  }

  private setupMiddleware() {
    this.app.use(express.json());
    this.app.use(requestLogger);
  }

  private setupRoutes() {
    // Initialize repositories
    const userRepository = SequelizeInstance.getUserRepository();
    const roomRepository = SequelizeInstance.getRoomRepository();
    const messageRepository = SequelizeInstance.getMessageRepository();

    // Initialize services
    const userService = new UserService(userRepository);
    const roomService = new RoomService(roomRepository);
    const messageService = new MessageService(messageRepository);

    // Initialize controllers
    const userController = new UserController(userService);
    const roomController = new RoomController(roomService);
    const messageController = new MessageController(messageService);

    // Initialize routers
    const userRouter = new UserRouter(userController);
    const roomRouter = new RoomRouter(roomController);
    const messageRouter = new MessageRouter(messageController);

    // Register routes
    this.app.use('/api/users', userRouter.getRouter());
    this.app.use('/api/rooms', roomRouter.getRouter());
    this.app.use('/api/messages', messageRouter.getRouter());

    // Root route
    this.app.get('/', (_req, res) => {
      res.json({ message: 'Welcome to the Chat System API' });
    });
  }

  private setupErrorHandling() {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public start() {
    return this.app.listen(this.port, () => {
      logger.info(`Server running on http://localhost:${this.port}`);
    });
  }

  public getApp() {
    return this.app;
  }
}
