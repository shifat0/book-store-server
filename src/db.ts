import knex from 'knex';
import { envConfig } from './config/envConfig';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = envConfig;

const dbConfig = {
  client: 'mysql',
  connection: {
    host: DB_HOST,
    port: parseInt(DB_PORT as string),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
};

const db = knex(dbConfig);

export default db;
