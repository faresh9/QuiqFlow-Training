import { Sequelize } from 'sequelize';
import { User } from '../models/index.js';
import { withTransaction } from '../api/utils/transactionHandler.js';
import { logger } from '../api/utils/logger.js';

class UserRepository {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async findAll(options = {}) {
    return await User.findAll(options);
  }

  async findById(id: number, options = {}) {
    return await User.findByPk(id, options);
  }

  async findByUsername(username: string) {
    return await User.findOne({ where: { username } });
  }

  async create(userData: any) {
    return await withTransaction(this.sequelize, async (transaction) => {
      const user = await User.create(userData, { transaction });
      logger.debug(`User created with id: ${user.id}`);
      return user;
    });
  }

  async update(id: number, userData: any) {
    return await withTransaction(this.sequelize, async (transaction) => {
      const user = await User.findByPk(id, { transaction });
      if (!user) {
        logger.warn(`Attempted to update non-existent user with id: ${id}`);
        return null;
      }
      const updatedUser = await user.update(userData, { transaction });
      logger.debug(`User updated with id: ${id}`);
      return updatedUser;
    });
  }

  async delete(id: number) {
    return await withTransaction(this.sequelize, async (transaction) => {
      const user = await User.findByPk(id, { transaction });
      if (!user) {
        logger.warn(`Attempted to delete non-existent user with id: ${id}`);
        return false;
      }
      await user.destroy({ transaction });
      logger.debug(`User deleted with id: ${id}`);
      return true;
    });
  }
}

export default UserRepository;
