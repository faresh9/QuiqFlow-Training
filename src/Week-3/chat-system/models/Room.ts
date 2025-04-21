import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

interface RoomAttributes {
  id?: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Room extends Model<RoomAttributes> {
  // Use declare instead of public fields
  declare id: number;
  declare name: string;
  declare description: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'rooms',
    modelName: 'Room',
  }
);
