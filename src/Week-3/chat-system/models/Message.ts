import { Model, DataTypes, Sequelize } from 'sequelize';

interface MessageAttributes {
  id?: number;
  content: string;
  userId: number;
  roomId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Message extends Model<MessageAttributes> {
  declare id: number;
  declare content: string;
  declare userId: number;
  declare roomId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initMessage(sequelize: Sequelize) {
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
          model: 'users',
          key: 'id',
        },
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'rooms',
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

  return Message;
}
