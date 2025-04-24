import { Sequelize } from 'sequelize';
import config from './config.json' with { type: 'json' };
import UserRepository from '../repositories/UserRepository.js';
import RoomRepository from '../repositories/RoomRepository.js';
import MessageRepository from '../repositories/MessageRepository.js';
import { initializeModels } from '../models/index.js';
class SequelizeInstance {
    constructor() {
        // Private constructor prevents direct instantiation
    }
    static getInstance() {
        if (!SequelizeInstance.instance) {
            const env = (process.env.NODE_ENV || 'development');
            const dbConfig = config[env];
            SequelizeInstance.instance = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
                host: dbConfig.host,
                dialect: dbConfig.dialect,
                logging: console.log,
                define: {
                    timestamps: true,
                    underscored: true,
                },
            });
            // Initialize models only once after creating the instance
            if (!SequelizeInstance.initialized) {
                initializeModels(SequelizeInstance.instance);
                SequelizeInstance.initialized = true;
            }
        }
        return SequelizeInstance.instance;
    }
    static getUserRepository() {
        if (!SequelizeInstance.userRepository) {
            SequelizeInstance.userRepository = new UserRepository(this.getInstance());
        }
        return SequelizeInstance.userRepository;
    }
    static getRoomRepository() {
        if (!SequelizeInstance.roomRepository) {
            SequelizeInstance.roomRepository = new RoomRepository(this.getInstance());
        }
        return SequelizeInstance.roomRepository;
    }
    static getMessageRepository() {
        if (!SequelizeInstance.messageRepository) {
            SequelizeInstance.messageRepository = new MessageRepository(this.getInstance());
        }
        return SequelizeInstance.messageRepository;
    }
    static async closeConnection() {
        if (SequelizeInstance.instance) {
            await SequelizeInstance.instance.close();
            SequelizeInstance.instance = null;
            SequelizeInstance.initialized = false;
        }
        // Reset repositories to null as well
        SequelizeInstance.userRepository = null;
        SequelizeInstance.roomRepository = null;
        SequelizeInstance.messageRepository = null;
    }
}
SequelizeInstance.instance = null;
SequelizeInstance.userRepository = null;
SequelizeInstance.roomRepository = null;
SequelizeInstance.messageRepository = null;
SequelizeInstance.initialized = false;
export default SequelizeInstance;
//# sourceMappingURL=SequelizeInstance.js.map