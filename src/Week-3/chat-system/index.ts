import sequelize from './config/database.js';
import { User, Room, Message } from './models/index.js';

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync all models with database
    await sequelize.sync({ force: true }); // Use force: true for testing purposes
    // This will drop the tables if they exist and recreate them
    // Remove force: true in production to avoid data loss
    // await sequelize.sync(); // Use this in production to avoid data loss
    console.log('Models synchronized with database.');

    // Query the test message with associations
    //What This Query Does:
    // This single line of code performs powerful database operations:
    // Retrieves all messages from your database
    // Eagerly loads related data for each message:
    // The user who sent the message
    // The room where the message was posted
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
