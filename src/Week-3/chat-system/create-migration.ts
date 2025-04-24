import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get migration name from command line argument
const migrationName = process.argv[2];
if (!migrationName) {
  console.error('Please provide a migration name');
  console.log('Example: npm run create-migration add-user-status');
  process.exit(1);
}

// Create timestamp for migration filename
const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').substring(0, 14);
const filename = `${timestamp}-${migrationName}.ts`;
const migrationsDir = path.join(__dirname, 'migrations');

// Create migrations directory if it doesn't exist
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

// Migration template
const template = `import { DataTypes, QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = async ({ context: queryInterface }) => {
  // Write your migration code here
  // Example:
  // await queryInterface.createTable('table_name', {
  //   id: {
  //     type: DataTypes.INTEGER,
  //     autoIncrement: true,
  //     primaryKey: true,
  //   },
  //   name: {
  //     type: DataTypes.STRING(100),
  //     allowNull: false,
  //   },
  //   created_at: {
  //     type: DataTypes.DATE,
  //     allowNull: false,
  //     defaultValue: DataTypes.NOW,
  //   },
  //   updated_at: {
  //     type: DataTypes.DATE,
  //     allowNull: false,
  //     defaultValue: DataTypes.NOW,
  //   }
  // });
};

export const down: MigrationFn<QueryInterface> = async ({ context: queryInterface }) => {
  // Undo your migration code here
  // Example:
  // await queryInterface.dropTable('table_name');
};
`;

// Write migration file
const filePath = path.join(migrationsDir, filename);
fs.writeFileSync(filePath, template);

console.log(`Migration created: ${filePath}`);