'use strict';

// ES Module format

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('users', [
    {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123', // In a real app, these would be hashed
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      username: 'jane_smith',
      email: 'jane@example.com',
      password: 'password123',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      username: 'bob_johnson',
      email: 'bob@example.com',
      password: 'password123',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      username: 'sarah_lee',
      email: 'sarah@example.com',
      password: 'password123',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      username: 'mike_brown',
      email: 'mike@example.com',
      password: 'password123',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('users', null, {});
}
