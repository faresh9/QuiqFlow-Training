'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('participants', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    room_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'rooms',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    joined_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  // Add a composite unique constraint to prevent duplicate participants
  await queryInterface.addIndex('participants', ['user_id', 'room_id'], {
    unique: true,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('participants');
}
