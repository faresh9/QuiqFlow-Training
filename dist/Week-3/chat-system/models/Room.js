import { Model, DataTypes } from 'sequelize';
export class Room extends Model {
}
export function initRoom(sequelize) {
    Room.init({
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
    }, {
        sequelize,
        tableName: 'rooms',
        modelName: 'Room',
    });
    return Room;
}
//# sourceMappingURL=Room.js.map