import UserRepository from '../../repositories/UserRepository.js';
import { AppError } from '../middleware/errorMiddleware.js';
//import { User } from '../../models/index.js';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw AppError.notFound(`User with id ${id} not found`);
    }
    return user;
  }

  async createUser(userData: any) {
    // Validate data
    if (!userData.username || !userData.email || !userData.password) {
      throw AppError.validation('Username, email, and password are required');
    }

    // Check if user already exists
    const existingUser = await this.userRepository.findByUsername(userData.username);
    if (existingUser) {
      throw AppError.validation(`Username ${userData.username} already exists`);
    }

    return await this.userRepository.create(userData);
  }

  async updateUser(id: number, userData: any) {
    const updatedUser = await this.userRepository.update(id, userData);
    if (!updatedUser) {
      throw AppError.notFound(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async deleteUser(id: number) {
    const success = await this.userRepository.delete(id);
    if (!success) {
      throw AppError.notFound(`User with id ${id} not found`);
    }
    return { success: true };
  }
}
