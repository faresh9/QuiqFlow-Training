import { Model, DataTypes } from 'sequelize';
export class Message extends Model {
}
export function initMessage(sequelize) {
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
    }, {
        sequelize,
        tableName: 'messages',
        modelName: 'Message',
    });
    return Message;
}
//# sourceMappingURL=Message.js.map