import { User } from './User.js';
import { Room } from './Room.js';
import { Message } from './Message.js';
import { Participant } from './Participant.js';

// Define associations
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

export { User, Room, Message, Participant };

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
