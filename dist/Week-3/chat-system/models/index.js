import SequelizeInstance from '../config/SequelizeInstance.js';
import { initUser, User } from './User.js';
import { initRoom, Room } from './Room.js';
import { initMessage, Message } from './Message.js';
import { initParticipant, Participant } from './Participant.js';
// Function to initialize all models with a sequelize instance
export function initializeModels(sequelize) {
    // Initialize models
    initUser(sequelize);
    initRoom(sequelize);
    initMessage(sequelize);
    initParticipant(sequelize);
    // Set up associations
    User.hasMany(Message, { foreignKey: 'userId' });
    Message.belongsTo(User, { foreignKey: 'userId' });
    Room.hasMany(Message, { foreignKey: 'roomId' });
    Message.belongsTo(Room, { foreignKey: 'roomId' });
    // Many-to-many relationship between User and Room
    User.belongsToMany(Room, {
        through: Participant,
        foreignKey: 'userId',
    });
    Room.belongsToMany(User, {
        through: Participant,
        foreignKey: 'roomId',
    });
    // Direct associations to participants
    User.hasMany(Participant, { foreignKey: 'userId' });
    Participant.belongsTo(User, { foreignKey: 'userId' });
    Room.hasMany(Participant, { foreignKey: 'roomId' });
    Participant.belongsTo(Room, { foreignKey: 'roomId' });
}
// Get sequelize instance
const sequelize = SequelizeInstance.getInstance();
// Initialize models with the sequelize instance
initializeModels(sequelize);
export { User, Room, Message, Participant };
export default { User, Room, Message, Participant };
// Diagram
// ┌─────────┐     ┌──────────────┐     ┌─────────┐
// │         │     │              │     │         │
// │  User   ├─── ▶│ Participant  │◀───┤  Room   │
// │         │     │              │     │         │
// └────┬────┘     └──────────────┘     └────┬────┘
//      │                                    │
//      │                                    │
//      │                                    │
//      │                                    │
//      ▼                                    ▼
// ┌─────────────────────────────────────────────┐
// │                                             │
// │                   Message                   │
// │                                             │
// └─────────────────────────────────────────────┘
//# sourceMappingURL=index.js.map