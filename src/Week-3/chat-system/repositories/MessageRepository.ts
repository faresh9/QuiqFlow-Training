import { Sequelize } from 'sequelize';
import { Message, User, Room } from '../models/index.js';

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
    const transaction = await this.sequelize.transaction();
    try {
      const message = await Message.create(messageData, { transaction });
      await transaction.commit();
      return message;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(id: number, messageData: any) {
    const transaction = await this.sequelize.transaction();
    try {
      const message = await Message.findByPk(id, { transaction });
      if (!message) {
        await transaction.rollback();
        return null;
      }
      const updatedMessage = await message.update(messageData, { transaction });
      await transaction.commit();
      return updatedMessage;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(id: number) {
    const transaction = await this.sequelize.transaction();
    try {
      const message = await Message.findByPk(id, { transaction });
      if (!message) {
        await transaction.rollback();
        return false;
      }
      await message.destroy({ transaction });
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
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
