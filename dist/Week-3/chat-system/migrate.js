import { migrations } from './config/migrations.js';
const command = process.argv[2] || 'up';
async function main() {
    try {
        switch (command) {
            case 'up':
                console.log('Running all pending migrations...');
                await migrations.up();
                break;
            case 'down':
                console.log('Reverting the most recent migration...');
                await migrations.down();
                break;
            case 'reset':
                console.log('Reverting all migrations...');
                await migrations.reset();
                break;
            case 'status':
                console.log('Migration status:');
                const status = await migrations.status();
                console.log('Executed:', status.executed);
                console.log('Pending:', status.pending);
                break;
            default:
                console.log('Unknown command. Use: up, down, reset, or status');
        }
    }
    catch (error) {
        console.error('Migration error:', error);
        process.exit(1);
    }
    console.log('Done');
    process.exit(0);
}
main();
//# sourceMappingURL=migrate.js.map