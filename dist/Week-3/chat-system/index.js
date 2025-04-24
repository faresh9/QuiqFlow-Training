import SequelizeInstance from './config/SequelizeInstance.js';
async function testConnection() {
    try {
        const sequelize = SequelizeInstance.getInstance();
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        // Sync all models with database
        await sequelize.sync({ force: true }); // Use force: true for testing purposes
        console.log('Models synchronized with database.');
        // Get repositories through the SequelizeInstance class
        const messageRepository = SequelizeInstance.getMessageRepository();
        const userRepository = SequelizeInstance.getUserRepository();
        const roomRepository = SequelizeInstance.getRoomRepository();
        // Use repository pattern instead of direct model access
        const messages = await messageRepository.findAllWithAssociations(); // Example usage of findAllWithAssociations
        const users = await userRepository.findAll();
        const rooms = await roomRepository.findAll();
        const roomWithParticipants = await roomRepository.findWithParticipants(1); // Example room ID
        console.log('Messages:\n');
        console.log(JSON.stringify(messages, null, 2));
        console.log('Users:\n');
        console.log(JSON.stringify(users, null, 2));
        console.log('Rooms:\n');
        console.log(JSON.stringify(rooms, null, 2));
        console.log('Room with Participants:\n');
        console.log(JSON.stringify(roomWithParticipants, null, 2));
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    finally {
        await SequelizeInstance.closeConnection();
    }
}
testConnection();
//# sourceMappingURL=index.js.map