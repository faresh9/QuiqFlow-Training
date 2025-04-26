import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor(userController: UserController) {
    this.router = Router();
    this.userController = userController;
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.get('/', this.userController.getAllUsers);
    this.router.get('/:id', this.userController.getUserById);
    this.router.post('/', this.userController.createUser);
    this.router.put('/:id', this.userController.updateUser);
    this.router.delete('/:id', this.userController.deleteUser);
  }

  public getRouter(): Router {
    return this.router;
  }
}
