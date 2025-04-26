import { Router } from 'express';
import { MessageController } from '../controllers/messageController.js';

export class MessageRouter {
  private router: Router;
  private messageController: MessageController;

  constructor(messageController: MessageController) {
    this.router = Router();
    this.messageController = messageController;
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.get('/', this.messageController.getAllMessages);
    this.router.get('/:id', this.messageController.getMessageById);
    this.router.get('/room/:roomId', this.messageController.getMessagesByRoomId);
    this.router.post('/', this.messageController.createMessage);
    this.router.put('/:id', this.messageController.updateMessage);
    this.router.delete('/:id', this.messageController.deleteMessage);
  }

  public getRouter(): Router {
    return this.router;
  }
}
