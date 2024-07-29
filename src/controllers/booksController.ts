import { Request, Response, NextFunction } from 'express';

export const postBooksController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.send('This is post route');
  } catch (error) {
    next(error);
  }
};

export const getBooksController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.send('This is get route');
  } catch (error) {
    next(error);
  }
};

export const getSingleBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.send('This is single get route');
  } catch (error) {
    next(error);
  }
};

export const updateBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.send('This is update route');
  } catch (error) {
    next(error);
  }
};

export const deleteBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.send('This is delete route');
  } catch (error) {
    next(error);
  }
};
