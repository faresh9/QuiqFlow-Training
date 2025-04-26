import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './api/utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationTemplate = `import { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = async ({ context: queryInterface }) => {
  // Add your migration code here
};

export const down: MigrationFn<QueryInterface> = async ({ context: queryInterface }) => {
  // Add your rollback code here
};
`;

async function createMigration() {
  // Get migration name from command line arguments
  const args = process.argv.slice(2);
  if (args.length === 0) {
    logger.error('Migration name is required');
    process.exit(1);
  }

  const migrationName = args[0];
  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, '')
    .substring(0, 14);
  const filename = `${timestamp}-${migrationName}.ts`;
  const filePath = path.join(__dirname, 'migrations', filename);

  try {
    // Create migrations directory if it doesn't exist
    const migrationsDir = path.join(__dirname, 'migrations');
    if (!fs.existsSync(migrationsDir)) {
      fs.mkdirSync(migrationsDir, { recursive: true });
    }

    fs.writeFileSync(filePath, migrationTemplate);
    logger.info(`Migration created at: ${filePath}`);
  } catch (error) {
    logger.error('Failed to create migration:');
    process.exit(1);
  }
}

createMigration().catch((error) => {
  logger.error('Unhandled error:', error);
  process.exit(1);
});
