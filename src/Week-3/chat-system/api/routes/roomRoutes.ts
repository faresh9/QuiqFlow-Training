import { Router } from 'express';
import { RoomController } from '../controllers/roomController.js';

export class RoomRouter {
  private router: Router;
  private roomController: RoomController;

  constructor(roomController: RoomController) {
    this.router = Router();
    this.roomController = roomController;
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.get('/', this.roomController.getAllRooms);
    this.router.get('/:id', this.roomController.getRoomById);
    this.router.get('/:id/participants', this.roomController.getRoomWithParticipants);
    this.router.post('/', this.roomController.createRoom);
    this.router.put('/:id', this.roomController.updateRoom);
    this.router.delete('/:id', this.roomController.deleteRoom);
    this.router.post('/:id/participants', this.roomController.addParticipant);
  }

  public getRouter(): Router {
    return this.router;
  }
}
