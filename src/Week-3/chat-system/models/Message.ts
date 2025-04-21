import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { User } from './User.js';
import { Room } from './Room.js';

interface MessageAttributes {
  id?: number;
  content: string;
  userId: number;
  roomId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Message extends Model<MessageAttributes> {
  // remove these to avoid shadowing

  // public id!: number;
  // public content!: string;
  // public userId!: number;
  // public roomId!: number;
  // public readonly createdAt!: Date;
  // public readonly updatedAt!: Date;

  declare id: number;
  declare content: string;
  declare userId: number;
  declare roomId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
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
  },
  {
    sequelize,
    tableName: 'messages',
    modelName: 'Message',
  }
);
