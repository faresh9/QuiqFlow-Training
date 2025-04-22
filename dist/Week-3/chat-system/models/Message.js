import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { User } from './User.js';
import { Room } from './Room.js';
export class Message extends Model {
}
Message.init({
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
}, {
    sequelize,
    tableName: 'messages',
    modelName: 'Message',
});
//# sourceMappingURL=Message.js.map