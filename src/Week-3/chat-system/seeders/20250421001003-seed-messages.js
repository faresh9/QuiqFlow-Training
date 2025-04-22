'use strict';

export async function up(queryInterface, Sequelize) {
  // Get participants to ensure we're creating valid messages
  const participants = await queryInterface.sequelize.query(
    'SELECT user_id, room_id FROM participants;',
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );

  const messages = [];
  const now = new Date();

  // For each participant, create a few messages
  for (const participant of participants) {
    messages.push({
      content: getRandomMessage(),
      user_id: participant.user_id,
      room_id: participant.room_id,
      created_at: new Date(now.getTime() - Math.random() * 7200000), // Random time within 2 hours
      updated_at: new Date(),
    });
  }

  await queryInterface.bulkInsert('messages', messages);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('messages', null, {});
}

// Helper function to generate random messages
function getRandomMessage() {
  const messages = [
    'Hello everyone!',
    "How's it going?",
    'Anyone here?',
    'I need some help with the project.',
    'Has anyone seen the latest update?',
    'Good morning!',
    'When is the next meeting?',
    'This is a test message.',
    "I'm having trouble with the API.",
    'Can someone help me with this bug?',
  ];

  return messages[Math.floor(Math.random() * messages.length)];
}
