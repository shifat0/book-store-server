import { Request, Response, NextFunction } from 'express';
import db from '../db';

export const postAuthorsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, bio, birthdate } = req.body;

    // Create a new book
    const author = {
      name,
      bio,
      birthdate,
    };

    // Insert the book into the database
    const result = await db('authors').insert(author);

    console.log(result);

    // Return the created book with a 201 status code
    res.status(201).json({
      id: result[0],
      ...author,
      message: 'Author Created Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getAuthorsController = async (
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

export const getSingleAuthorController = async (
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

export const updateAuthorController = async (
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

export const deleteAuthorController = async (
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
