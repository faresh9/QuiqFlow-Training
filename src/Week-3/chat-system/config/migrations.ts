import { Umzug, SequelizeStorage } from 'umzug';
import path from 'path';
import { fileURLToPath } from 'url';
import SequelizeInstance from './SequelizeInstance.js';
import { logger } from '../api/utils/logger.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create migration instance
export function getMigrator() {
  const sequelize = SequelizeInstance.getInstance();

  return new Umzug({
    migrations: {
      glob: ['../migrations/*.ts', { cwd: __dirname }],
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: {
      // Override Umzug's logger with our logger
      debug: (message) =>
        logger.debug(typeof message === 'string' ? message : JSON.stringify(message)),
      info: (message) =>
        logger.info(typeof message === 'string' ? message : JSON.stringify(message)),
      warn: (message) =>
        logger.warn(typeof message === 'string' ? message : JSON.stringify(message)),
      error: (message) =>
        logger.error(typeof message === 'string' ? message : JSON.stringify(message)),
    },
  });
}

// Run all pending migrations
export async function runMigrations() {
  const umzug = getMigrator();

  // Simple event logging
  umzug.on('migrating', ({ name }) => logger.info(`Migrating: ${name}`));
  umzug.on('migrated', ({ name }) => logger.info(`Migrated: ${name}`));

  return umzug.up();
}

// Migration utilities
export const migrations = {
  // Run all pending migrations
  up: async () => getMigrator().up(),

  // Revert the most recent migration
  down: async () => getMigrator().down(),

  // Revert all migrations
  reset: async () => getMigrator().down({ to: 0 }),

  // Get migration status
  status: async () => {
    const umzug = getMigrator();
    return {
      pending: (await umzug.pending()).map((m) => m.name),
      executed: (await umzug.executed()).map((m) => m.name),
    };
  },
};

// Run migrations on startup
// runMigrations()
//   .then(() => logger.info('Migrations completed successfully'))
//   .catch(err => logger.error('Error running migrations:', err));
