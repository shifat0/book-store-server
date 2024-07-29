import express, { NextFunction, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/routes';
import { envConfig } from './config/envConfig';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Root Url
app.get(
  envConfig.API_BASE_URL as string,
  async (_, res: Response, next: NextFunction) => {
    try {
      res.send('Server is online!');
    } catch (error) {
      next(error);
    }
  },
);

// Router
app.use(envConfig.API_BASE_URL as string, router);

// Error Hanlder
app.use(errorHandler);

export default app;
