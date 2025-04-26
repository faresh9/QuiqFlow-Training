import MessageRepository from '../../repositories/MessageRepository.js';
import { AppError } from '../middleware/errorMiddleware.js';

export class MessageService {
  private messageRepository: MessageRepository;

  constructor(messageRepository: MessageRepository) {
    this.messageRepository = messageRepository;
  }

  async getAllMessages() {
    return await this.messageRepository.findAllWithAssociations();
  }

  async getMessageById(id: number) {
    const message = await this.messageRepository.findById(id);
    if (!message) {
      throw AppError.notFound(`Message with id ${id} not found`);
    }
    return message;
  }

  async getMessagesByRoomId(roomId: number) {
    return await this.messageRepository.findByRoomId(roomId);
  }

  async createMessage(messageData: any) {
    // Validate data
    if (!messageData.content || !messageData.userId || !messageData.roomId) {
      throw AppError.validation('Message content, userId, and roomId are required');
    }

    return await this.messageRepository.create(messageData);
  }

  async updateMessage(id: number, messageData: any) {
    const updatedMessage = await this.messageRepository.update(id, messageData);
    if (!updatedMessage) {
      throw AppError.notFound(`Message with id ${id} not found`);
    }
    return updatedMessage;
  }

  async deleteMessage(id: number) {
    const success = await this.messageRepository.delete(id);
    if (!success) {
      throw AppError.notFound(`Message with id ${id} not found`);
    }
    return { success: true };
  }
}
