import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Use the same database name as in config.json
const dbName = process.env.DB_NAME || 'chat_db';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || '342001';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '5432');

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  logging: console.log,
  define: {
    timestamps: true,
    underscored: true,
  },
});

export default sequelize;
