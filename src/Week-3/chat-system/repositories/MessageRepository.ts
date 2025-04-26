import { Sequelize } from 'sequelize';
import { Message, User, Room } from '../models/index.js';
import { withTransaction } from '../api/utils/transactionHandler.js';
import { logger } from '../api/utils/logger.js';

class MessageRepository {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async findAll(options = {}) {
    return await Message.findAll(options);
  }

  async findById(id: number, options = {}) {
    return await Message.findByPk(id, options);
  }

  async findByRoomId(roomId: number) {
    return await Message.findAll({
      where: { roomId },
      include: [User],
      order: [['createdAt', 'ASC']],
    });
  }

  async create(messageData: any) {
    return await withTransaction(this.sequelize, async (transaction) => {
      const message = await Message.create(messageData, { transaction });
      logger.debug(`Message created with id: ${message.id} in room ${messageData.roomId}`);
      return message;
    });
  }

  async update(id: number, messageData: any) {
    return await withTransaction(this.sequelize, async (transaction) => {
      const message = await Message.findByPk(id, { transaction });
      if (!message) {
        logger.warn(`Attempted to update non-existent message with id: ${id}`);
        return null;
      }
      const updatedMessage = await message.update(messageData, { transaction });
      logger.debug(`Message updated with id: ${id}`);
      return updatedMessage;
    });
  }

  async delete(id: number) {
    return await withTransaction(this.sequelize, async (transaction) => {
      const message = await Message.findByPk(id, { transaction });
      if (!message) {
        logger.warn(`Attempted to delete non-existent message with id: ${id}`);
        return false;
      }
      await message.destroy({ transaction });
      logger.debug(`Message deleted with id: ${id}`);
      return true;
    });
  }

  // This method retrieves all messages with their associated User and Room models, ordered by creation date in descending order.
  async findAllWithAssociations() {
    return await Message.findAll({
      include: [User, Room],
      order: [['createdAt', 'DESC']],
    });
  }
}

export default MessageRepository;
