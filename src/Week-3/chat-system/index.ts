import sequelize from './config/database.js';
import { User, Room, Message } from './models/index.js';

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync all models with database
    await sequelize.sync({ force: true });
    console.log('Models synchronized with database.');

    // Create a test user
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123', // In a real app, this would be hashed
    });

    // Create a test room
    const room = await Room.create({
      name: 'General Chat',
      description: 'A general chat room for everyone',
    });

    // Create a test message
    const message = await Message.create({
      content: 'Hello world!',
      userId: user.id,
      roomId: room.id,
    });

    console.log('Test data created successfully!');

    // Query the test message with associations
    const messages = await Message.findAll({
      include: [User, Room],
    });

    console.log(JSON.stringify(messages, null, 2));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
