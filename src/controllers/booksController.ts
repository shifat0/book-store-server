import { Request, Response, NextFunction } from 'express';
import db from '../db';

export const postBooksController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, published_date, author_id } = req.body;

    // Create a new book
    const book = {
      title,
      description,
      published_date,
      author_id,
    };

    // Insert the book into the database
    const result = await db('books').insert(book);

    console.log(result);

    // Return the created book with a 201 status code
    res
      .status(201)
      .json({ id: result[0], ...book, message: 'Data Fetched Successfully' });
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
