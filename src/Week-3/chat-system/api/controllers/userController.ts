import { Request, Response } from 'express';
import { UserService } from '../services/userService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorMiddleware.js';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;

    // Bind methods to preserve 'this' context
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();
    res.json({
      status: 'success',
      results: users.length,
      data: users,
    });
  });

  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw AppError.badRequest('Invalid ID format');
    }

    const user = await this.userService.getUserById(id);
    res.json({
      status: 'success',
      data: user,
    });
  });

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const userData = req.body;
    const newUser = await this.userService.createUser(userData);

    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  });

  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw AppError.badRequest('Invalid ID format');
    }

    const userData = req.body;
    const updatedUser = await this.userService.updateUser(id, userData);

    res.json({
      status: 'success',
      data: updatedUser,
    });
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw AppError.badRequest('Invalid ID format');
    }

    await this.userService.deleteUser(id);

    res.json({
      status: 'success',
      message: 'User deleted successfully',
    });
  });
}
