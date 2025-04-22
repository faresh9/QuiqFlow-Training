import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { User } from './User.js';
import { Room } from './Room.js';

interface ParticipantAttributes {
  id?: number;
  userId: number;
  roomId: number;
  joinedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Participant extends Model<ParticipantAttributes> {
  declare id: number;
  declare userId: number;
  declare roomId: number;
  declare joinedAt: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Participant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Room,
        key: 'id',
      },
    },
    joinedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'participants',
    modelName: 'Participant',
  }
);
