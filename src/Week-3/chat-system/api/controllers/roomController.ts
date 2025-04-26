import { Request, Response } from 'express';
import { RoomService } from '../services/roomService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorMiddleware.js';

export class RoomController {
  private roomService: RoomService;

  constructor(roomService: RoomService) {
    this.roomService = roomService;

    // Bind methods to preserve 'this' context
    this.getAllRooms = this.getAllRooms.bind(this);
    this.getRoomById = this.getRoomById.bind(this);
    this.getRoomWithParticipants = this.getRoomWithParticipants.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
  }

  getAllRooms = asyncHandler(async (_req: Request, res: Response) => {
    const rooms = await this.roomService.getAllRooms();
    res.json({
      status: 'success',
      results: rooms.length,
      data: rooms,
    });
  });

  getRoomById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw AppError.badRequest('Invalid room ID format');
    }

    const room = await this.roomService.getRoomById(id);
    res.json({
      status: 'success',
      data: room,
    });
  });

  getRoomWithParticipants = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw AppError.badRequest('Invalid room ID format');
    }

    const room = await this.roomService.getRoomWithParticipants(id);
    res.json({
      status: 'success',
      data: room,
    });
  });

  createRoom = asyncHandler(async (req: Request, res: Response) => {
    const roomData = req.body;
    const newRoom = await this.roomService.createRoom(roomData);

    res.status(201).json({
      status: 'success',
      data: newRoom,
    });
  });

  updateRoom = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw AppError.badRequest('Invalid room ID format');
    }

    const roomData = req.body;
    const updatedRoom = await this.roomService.updateRoom(id, roomData);

    res.json({
      status: 'success',
      data: updatedRoom,
    });
  });

  deleteRoom = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw AppError.badRequest('Invalid room ID format');
    }

    await this.roomService.deleteRoom(id);

    res.json({
      status: 'success',
      message: 'Room deleted successfully',
    });
  });

  addParticipant = asyncHandler(async (req: Request, res: Response) => {
    const roomId = parseInt(req.params.id);
    const { userId } = req.body;

    if (isNaN(roomId) || isNaN(userId)) {
      throw AppError.badRequest('Invalid room ID or user ID format');
    }

    const participant = await this.roomService.addParticipant(roomId, userId);

    res.status(201).json({
      status: 'success',
      data: participant,
    });
  });
}
