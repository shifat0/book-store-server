import app from './app';
import db from './db';
import { envConfig } from './config/envConfig';

const port = envConfig.PORT || 5000;

async function dbConnection() {
  try {
    await db.raw('SELECT 1');
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

dbConnection();

app.listen(port, () => {
  console.log(`Server is online at ${port}!`);
});
