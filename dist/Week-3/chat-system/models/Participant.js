import { Model, DataTypes } from 'sequelize';
export class Participant extends Model {
}
export function initParticipant(sequelize) {
    Participant.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        joinedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        tableName: 'participants',
        modelName: 'Participant',
    });
    return Participant;
}
//# sourceMappingURL=Participant.js.map