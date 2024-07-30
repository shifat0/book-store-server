import { envConfig } from './src/config/envConfig';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = envConfig;

module.exports = {
  client: 'mysql',
  connection: {
    host: DB_HOST,
    port: parseInt(DB_PORT as string) || 3306,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  migrations: {
    directory: './src/models/migrations',
    extension: 'ts',
  },
  seeds: {
    directory: './src/db/seeds',
    extension: 'ts',
  },
};
