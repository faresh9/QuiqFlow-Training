'use strict';

export async function up(queryInterface, Sequelize) {
  // First, get the IDs of the users and rooms
  const users = await queryInterface.sequelize.query('SELECT id FROM users;', {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  });

  const rooms = await queryInterface.sequelize.query('SELECT id FROM rooms;', {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  });

  // Create participants - each user joins multiple rooms
  const participants = [];
  const now = new Date();

  // Add all users to the General room (room_id = 1)
  users.forEach((user) => {
    participants.push({
      user_id: user.id,
      room_id: rooms[0].id, // General room
      joined_at: now,
      created_at: now,
      updated_at: now,
    });
  });

  // Add some users to other rooms
  participants.push(
    {
      user_id: users[0].id, // john_doe
      room_id: rooms[1].id, // Technical Support
      joined_at: now,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: users[1].id, // jane_smith
      room_id: rooms[1].id, // Technical Support
      joined_at: now,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: users[2].id, // bob_johnson
      room_id: rooms[2].id, // Random
      joined_at: now,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: users[0].id, // john_doe
      room_id: rooms[2].id, // Random
      joined_at: now,
      created_at: now,
      updated_at: now,
    }
  );

  await queryInterface.bulkInsert('participants', participants);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('participants', null, {});
}
