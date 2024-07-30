import { Request, Response, NextFunction } from 'express';
import db from '../db';
import {
  createResponse,
  errorResponse,
  existsErrorResponse,
  getResponse,
  notFoundErrorResponse,
} from '../utils/response';

// Post Authors
export const postAuthorsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, bio, birthDate } = req.body;

    // Checking if a author exists with the same name
    const existingAuthor = await db('authors').where({ name }).first();

    if (existingAuthor)
      return res.status(400).json(existsErrorResponse('Author'));

    // Create a new book
    const author = {
      name,
      bio,
      birthDate: new Date(birthDate),
    };

    // Insert the book into the database
    const result = await db('authors').insert(author);

    const payload = {
      id: result[0],
      ...author,
    };

    res.status(201).json(createResponse(payload, 'Author'));
  } catch (error: any) {
    next(error);
  }
};

// Get Authors
export const getAuthorsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authors = await db('authors').select('*');
    console.log(authors);

    if (!authors) return res.status(404).json(notFoundErrorResponse());

    res.status(200).json(getResponse(authors));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get Author By ID
export const getSingleAuthorController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id)))
      return res.status(400).json(errorResponse('Invalid author ID'));

    // Find authors
    const author = await db('authors').where({ id }).first();

    if (!author) return res.status(404).json(notFoundErrorResponse('Author'));

    res.status(200).json(getResponse(author));
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
