import { Model, DataTypes } from 'sequelize';
export class User extends Model {
}
export function initUser(sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'users',
        modelName: 'User',
    });
    return User;
}
//# sourceMappingURL=User.js.map