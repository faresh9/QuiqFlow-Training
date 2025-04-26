import { Request, Response } from 'express';
import { MessageService } from '../services/messageService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorMiddleware.js';

export class MessageController {
  private messageService: MessageService;

  constructor(messageService: MessageService) {
    this.messageService = messageService;

    // Bind methods to preserve 'this' context
    this.getAllMessages = this.getAllMessages.bind(this);
    this.getMessageById = this.getMessageById.bind(this);
    this.getMessagesByRoomId = this.getMessagesByRoomId.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  getAllMessages = asyncHandler(async (_req: Request, res: Response) => {
    const messages = await this.messageService.getAllMessages();
    res.json({
      status: 'success',
      results: messages.length,
      data: messages,
    });
  });

  getMessageById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw AppError.badRequest('Invalid message ID format');
    }

    const message = await this.messageService.getMessageById(id);
    res.json({
      status: 'success',
      data: message,
    });
  });

  getMessagesByRoomId = asyncHandler(async (req: Request, res: Response) => {
    const roomId = parseInt(req.params.roomId);

    if (isNaN(roomId)) {
      throw AppError.badRequest('Invalid room ID format');
    }

    const messages = await this.messageService.getMessagesByRoomId(roomId);
    res.json({
      status: 'success',
      results: messages.length,
      data: messages,
    });
  });

  createMessage = asyncHandler(async (req: Request, res: Response) => {
    const messageData = req.body;
    const newMessage = await this.messageService.createMessage(messageData);

    res.status(201).json({
      status: 'success',
      data: newMessage,
    });
  });

  updateMessage = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw AppError.badRequest('Invalid message ID format');
    }

    const messageData = req.body;
    const updatedMessage = await this.messageService.updateMessage(id, messageData);

    res.json({
      status: 'success',
      data: updatedMessage,
    });
  });

  deleteMessage = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw AppError.badRequest('Invalid message ID format');
    }

    await this.messageService.deleteMessage(id);

    res.json({
      status: 'success',
      message: 'Message deleted successfully',
    });
  });
}
