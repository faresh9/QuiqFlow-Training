import { Model, DataTypes, Sequelize } from 'sequelize';

interface RoomAttributes {
  id?: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Room extends Model<RoomAttributes> {
  declare id: number;
  declare name: string;
  declare description: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initRoom(sequelize: Sequelize) {
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
  
  return Room;
}
