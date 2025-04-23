import { Sequelize, Dialect } from 'sequelize';
import config from './config.json' with { type: 'json' };
import UserRepository from '../repositories/UserRepository.js';
import RoomRepository from '../repositories/RoomRepository.js';
import MessageRepository from '../repositories/MessageRepository.js';

class SequelizeInstance {
  private static instance: Sequelize | null = null;
  private static userRepository: UserRepository | null = null;
  private static roomRepository: RoomRepository | null = null;
  private static messageRepository: MessageRepository | null = null;

  private constructor() {
    // Private constructor prevents direct instantiation
  }

  public static getInstance(): Sequelize {
    if (!SequelizeInstance.instance) {
      const env = (process.env.NODE_ENV || 'development') as keyof typeof config;
      const dbConfig = config[env];

      SequelizeInstance.instance = new Sequelize(
        dbConfig.database,
        dbConfig.username,
        dbConfig.password,
        {
          host: dbConfig.host,
          dialect: dbConfig.dialect as Dialect,
          logging: console.log,
          define: {
            timestamps: true,
            underscored: true,
          },
        }
      );
    }

    return SequelizeInstance.instance;
  }

  public static getUserRepository(): UserRepository {
    if (!SequelizeInstance.userRepository) {
      SequelizeInstance.userRepository = new UserRepository(this.getInstance());
    }
    return SequelizeInstance.userRepository;
  }

  public static getRoomRepository(): RoomRepository {
    if (!SequelizeInstance.roomRepository) {
      SequelizeInstance.roomRepository = new RoomRepository(this.getInstance());
    }
    return SequelizeInstance.roomRepository;
  }

  public static getMessageRepository(): MessageRepository {
    if (!SequelizeInstance.messageRepository) {
      SequelizeInstance.messageRepository = new MessageRepository(this.getInstance());
    }
    return SequelizeInstance.messageRepository;
  }

  public static async closeConnection(): Promise<void> {
    if (SequelizeInstance.instance) {
      await SequelizeInstance.instance.close();
      SequelizeInstance.instance = null;
    }
    // Reset repositories to null as well
    SequelizeInstance.userRepository = null;
    SequelizeInstance.roomRepository = null;
    SequelizeInstance.messageRepository = null;
  }
}

export default SequelizeInstance;
