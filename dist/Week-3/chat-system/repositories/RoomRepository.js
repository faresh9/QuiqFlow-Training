import { Room, User, Participant } from '../models/index.js';
class RoomRepository {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    async findAll(options = {}) {
        return await Room.findAll(options);
    }
    async findById(id, options = {}) {
        return await Room.findByPk(id, options);
    }
    async findWithParticipants(id) {
        return await Room.findByPk(id, {
            include: [{ model: User, through: Participant }],
        });
    }
    async create(roomData) {
        const transaction = await this.sequelize.transaction();
        try {
            const room = await Room.create(roomData, { transaction });
            await transaction.commit();
            return room;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async update(id, roomData) {
        const transaction = await this.sequelize.transaction();
        try {
            const room = await Room.findByPk(id, { transaction });
            if (!room) {
                await transaction.rollback();
                return null;
            }
            const updatedRoom = await room.update(roomData, { transaction });
            await transaction.commit();
            return updatedRoom;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async delete(id) {
        const transaction = await this.sequelize.transaction();
        try {
            const room = await Room.findByPk(id, { transaction });
            if (!room) {
                await transaction.rollback();
                return false;
            }
            await room.destroy({ transaction });
            await transaction.commit();
            return true;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async addParticipant(roomId, userId) {
        const transaction = await this.sequelize.transaction();
        try {
            const participant = await Participant.create({
                roomId,
                userId,
                joinedAt: new Date(),
            }, { transaction });
            await transaction.commit();
            return participant;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}
export default RoomRepository;
//# sourceMappingURL=RoomRepository.js.map