import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import SequelizeInstance from './SequelizeInstance.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create migration instance
export function getMigrator() {
  const sequelize = SequelizeInstance.getInstance();
  
  return new Umzug({
    migrations: {
      glob: ['../migrations/*.js', { cwd: __dirname }],
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console
  });
}

// Run all pending migrations
export async function runMigrations() {
  const umzug = getMigrator();
  
  // Simple event logging
  umzug.on('migrating', ({ name }) => console.log(`Migrating: ${name}`));
  umzug.on('migrated', ({ name }) => console.log(`Migrated: ${name}`));
  
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
      pending: (await umzug.pending()).map(m => m.name),
      executed: (await umzug.executed()).map(m => m.name)
    };
  }
};

// Run migrations on startup
  runMigrations()
    .then(() => console.log('Migrations completed successfully'))
    .catch(err => console.error('Error running migrations:', err));
