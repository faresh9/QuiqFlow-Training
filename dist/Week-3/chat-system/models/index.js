import { User } from './User.js';
import { Room } from './Room.js';
import { Message } from './Message.js';
// Define associations
User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });
Room.hasMany(Message, { foreignKey: 'roomId' });
Message.belongsTo(Room, { foreignKey: 'roomId' });
export { User, Room, Message };
//# sourceMappingURL=index.js.map