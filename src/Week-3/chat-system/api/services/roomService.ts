import RoomRepository from '../../repositories/RoomRepository.js';
import { AppError } from '../middleware/errorMiddleware.js';

export class RoomService {
  private roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async getAllRooms() {
    return await this.roomRepository.findAll();
  }

  async getRoomById(id: number) {
    const room = await this.roomRepository.findById(id);
    if (!room) {
      throw AppError.notFound(`Room with id ${id} not found`);
    }
    return room;
  }

  async getRoomWithParticipants(id: number) {
    const room = await this.roomRepository.findWithParticipants(id);
    if (!room) {
      throw AppError.notFound(`Room with id ${id} not found`);
    }
    return room;
  }

  async createRoom(roomData: any) {
    // Validate data
    if (!roomData.name) {
      throw AppError.validation('Room name is required');
    }

    return await this.roomRepository.create(roomData);
  }

  async updateRoom(id: number, roomData: any) {
    const updatedRoom = await this.roomRepository.update(id, roomData);
    if (!updatedRoom) {
      throw AppError.notFound(`Room with id ${id} not found`);
    }
    return updatedRoom;
  }

  async deleteRoom(id: number) {
    const success = await this.roomRepository.delete(id);
    if (!success) {
      throw AppError.notFound(`Room with id ${id} not found`);
    }
    return { success: true };
  }

  async addParticipant(roomId: number, userId: number) {
    try {
      return await this.roomRepository.addParticipant(roomId, userId);
    } catch (error) {
      throw AppError.badRequest(
        `Unable to add user to room: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
