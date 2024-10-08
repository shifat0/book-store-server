import { NextFunction, Request, Response } from 'express';

interface Error {
  statusCode?: number;
  message?: string;
  sqlMessage?: string;
}

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(error.message || error.sqlMessage);

  const status = error.statusCode || 500;
  const message = error.sqlMessage || error.message || 'Internal Server Error';

  res.status(status).json({ message });
}
