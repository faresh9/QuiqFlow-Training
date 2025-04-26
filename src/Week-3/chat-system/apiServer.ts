import { Server } from './server.js';
import { logger } from './api/utils/logger.js';

try {
  const port = parseInt(process.env.PORT || '3000');
  const server = new Server(port);
  server.start();
  logger.info(`Chat System API started on port ${port}`);
} catch (error) {
  logger.error('Failed to start server:');
  process.exit(1);
}
