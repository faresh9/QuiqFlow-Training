import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
export class Room extends Model {
}
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
//# sourceMappingURL=Room.js.map