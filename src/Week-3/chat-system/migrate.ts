import { migrations } from './config/migrations.js';
import { logger } from './api/utils/logger.js';

async function runMigration() {
  try {
    const command = process.argv[2] || 'up';

    switch (command) {
      case 'up':
        logger.info('Running pending migrations...');
        await migrations.up();
        logger.info('Migrations completed successfully');
        break;

      case 'down':
        logger.info('Reverting the most recent migration...');
        await migrations.down();
        logger.info('Migration reverted successfully');
        break;

      case 'reset':
        logger.info('Resetting all migrations...');
        await migrations.reset();
        logger.info('All migrations reverted successfully');
        break;

      case 'status':
        logger.info('Getting migration status...');
        const status = await migrations.status();
        logger.info('Migration status:');
        logger.info('Pending migrations:', status.pending);
        logger.info('Executed migrations:', status.executed);
        break;

      default:
        logger.error(`Unknown command: ${command}`);
        logger.info('Available commands: up, down, reset, status');
        process.exit(1);
    }
  } catch (error) {
    logger.error('Migration error:');
    process.exit(1);
  }
}

// runMigration().catch(() => {
//   logger.error('Unhandled error:');
//   process.exit(1);
// });
