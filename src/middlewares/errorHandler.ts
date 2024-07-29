import { Request, Response } from 'express';

interface Error {
  status?: number;
  message?: string;
}

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
) {
  console.error(error);

  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';

  res.status(status).json({ message });
}
