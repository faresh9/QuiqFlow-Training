import { Sequelize } from 'sequelize';
import { Room, User, Participant } from '../models/index.js';
import { withTransaction } from '../api/utils/transactionHandler.js';
import { logger } from '../api/utils/logger.js';

class RoomRepository {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async findAll(options = {}) {
    return await Room.findAll(options);
  }

  async findById(id: number, options = {}) {
    return await Room.findByPk(id, options);
  }

  async findWithParticipants(id: number) {
    return await Room.findByPk(id, {
      include: [{ model: User, through: Participant }],
    });
  }

  async findRoomsByUserId(userId: number) {
    return await Room.findAll({
      include: [
        {
          model: Participant,
          where: { userId },
          attributes: [],
        },
      ],
    });
  }

  async isUserInRoom(userId: number, roomId: number): Promise<boolean> {
    const participant = await Participant.findOne({
      where: {
        userId,
        roomId,
      },
    });

    return !!participant;
  }

  async create(roomData: any) {
    return await withTransaction(this.sequelize, async (transaction) => {
      const room = await Room.create(roomData, { transaction });
      logger.debug(`Room created with id: ${room.id}`);
      return room;
    });
  }

  async update(id: number, roomData: any) {
    return await withTransaction(this.sequelize, async (transaction) => {
      const room = await Room.findByPk(id, { transaction });
      if (!room) {
        logger.warn(`Attempted to update non-existent room with id: ${id}`);
        return null;
      }
      const updatedRoom = await room.update(roomData, { transaction });
      logger.debug(`Room updated with id: ${id}`);
      return updatedRoom;
    });
  }

  async delete(id: number) {
    return await withTransaction(this.sequelize, async (transaction) => {
      const room = await Room.findByPk(id, { transaction });
      if (!room) {
        logger.warn(`Attempted to delete non-existent room with id: ${id}`);
        return false;
      }
      await room.destroy({ transaction });
      logger.debug(`Room deleted with id: ${id}`);
      return true;
    });
  }

  async addParticipant(roomId: number, userId: number) {
    return await withTransaction(this.sequelize, async (transaction) => {
      const participant = await Participant.create(
        {
          roomId,
          userId,
          joinedAt: new Date(),
        },
        { transaction }
      );
      logger.debug(`User ${userId} added to room ${roomId}`);
      return participant;
    });
  }
}

export default RoomRepository;
