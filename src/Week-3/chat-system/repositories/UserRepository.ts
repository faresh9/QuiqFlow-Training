import { Sequelize } from 'sequelize';
import { User } from '../models/index.js';

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
    const transaction = await this.sequelize.transaction();
    try {
      const user = await User.create(userData, { transaction });
      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(id: number, userData: any) {
    const transaction = await this.sequelize.transaction();
    try {
      const user = await User.findByPk(id, { transaction });
      if (!user) {
        await transaction.rollback();
        return null;
      }
      const updatedUser = await user.update(userData, { transaction });
      await transaction.commit();
      return updatedUser;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(id: number) {
    const transaction = await this.sequelize.transaction();
    try {
      const user = await User.findByPk(id, { transaction });
      if (!user) {
        await transaction.rollback();
        return false;
      }
      await user.destroy({ transaction });
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

export default UserRepository;
