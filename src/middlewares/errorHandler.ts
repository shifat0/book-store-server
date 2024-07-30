import { Request, Response } from 'express';

interface Error {
  status?: number;
  message?: string;
  sqlMessage?: string;
}

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
) {
  console.log('inside error handler');
  console.log('error handler', error);

  const status = error.status || 500;
  const message = error.sqlMessage || error.message || 'Internal Server Error';

  res.status(status).json({ message });
}
