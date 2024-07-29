import dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
  PORT: process.env.SERVER_PORT,
  API_BASE_URL: process.env.API_BASE_URL,

  // DB Config
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};
