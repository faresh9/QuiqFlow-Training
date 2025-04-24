import { User } from '../models/index.js';
class UserRepository {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    async findAll(options = {}) {
        return await User.findAll(options);
    }
    async findById(id, options = {}) {
        return await User.findByPk(id, options);
    }
    async findByUsername(username) {
        return await User.findOne({ where: { username } });
    }
    async create(userData) {
        const transaction = await this.sequelize.transaction();
        try {
            const user = await User.create(userData, { transaction });
            await transaction.commit();
            return user;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async update(id, userData) {
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
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async delete(id) {
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
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}
export default UserRepository;
//# sourceMappingURL=UserRepository.js.map