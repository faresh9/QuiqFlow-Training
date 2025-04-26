import SequelizeInstance from './config/SequelizeInstance.js';
import { logger } from './api/utils/logger.js';
//import { asyncHandler } from './api/utils/asyncHandler.js';

// Create a version of asyncHandler that works with normal functions (not Express handlers)
const withAsyncErrorHandling = (fn: () => Promise<void>) => {
  return async () => {
    try {
      await fn();
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message, { stack: error.stack });
      } else {
        logger.error('Unknown error occurred');
      }
    }
  };
};

const testConnection = withAsyncErrorHandling(async () => {
  try {
    const sequelize = SequelizeInstance.getInstance();
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');

    // Sync all models with database
    await sequelize.sync(); // Use force: true for testing purposes
    logger.info('Models synchronized with database.');

    // Get repositories through the SequelizeInstance class
    const messageRepository = SequelizeInstance.getMessageRepository();
    const userRepository = SequelizeInstance.getUserRepository();
    const roomRepository = SequelizeInstance.getRoomRepository();

    // Use repository pattern instead of direct model access
    const messages = await messageRepository.findAllWithAssociations(); // Example usage of findAllWithAssociations
    const users = await userRepository.findAll();
    const rooms = await roomRepository.findAll();
    const roomWithParticipants = await roomRepository.findWithParticipants(1); // Example room ID

    logger.info('Messages:');
    logger.info(JSON.stringify(messages, null, 2));
    logger.info('Users:');
    logger.info(JSON.stringify(users, null, 2));
    logger.info('Rooms:');
    logger.info(JSON.stringify(rooms, null, 2));
    logger.info('Room with Participants:');
    logger.info(JSON.stringify(roomWithParticipants, null, 2));
  } finally {
    await SequelizeInstance.closeConnection();
  }
});

testConnection();
