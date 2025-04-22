'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('rooms', [
    {
      name: 'General',
      description: 'General discussion for everyone',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Technical Support',
      description: 'Get help with technical issues',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Random',
      description: 'Random discussions about anything',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Project Alpha',
      description: 'Discussions about Project Alpha',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('rooms', null, {});
}
