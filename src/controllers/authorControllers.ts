import { Request, Response, NextFunction } from 'express';
import db from '../db';
import {
  createResponse,
  deleteResponse,
  errorResponse,
  existsErrorResponse,
  getResponse,
  notFoundErrorResponse,
  updateResponse,
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

    // Check if id is valid
    if (!id || isNaN(Number(id)))
      return res.status(400).json(errorResponse('Invalid author ID'));

    // Check if the author exists
    const author = await db('authors').where({ id }).first();
    if (!author) return res.status(404).json(notFoundErrorResponse('Author'));

    res.status(200).json(getResponse(author));
  } catch (error) {
    next(error);
  }
};

// Update Author
export const updateAuthorController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { name, bio, birthdate } = req.body;

    // Check if the id is valid
    if (!id || isNaN(Number(id)))
      return res.status(400).json(errorResponse('Invalid author ID'));

    // Check if the author exists
    const author = await db('authors').where({ id }).first();
    if (!author) return res.status(404).json(notFoundErrorResponse('Author'));

    const updatedAuthor = {
      name,
      bio,
      birthdate: birthdate ? new Date(birthdate) : author.birthdate,
    };

    // Update the author
    const isUpdated = await db('authors').where({ id }).update(updatedAuthor);

    if (isUpdated !== 1)
      return res
        .status(500)
        .json(errorResponse('Author update failed due to server error!'));

    // Return the updated author
    res.status(200).json(updateResponse('Author', updatedAuthor));
  } catch (error) {
    next(error);
  }
};

// Delete Author
export const deleteAuthorController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // Check if id is valid
    if (!id || isNaN(Number(id)))
      return res.status(400).json(errorResponse('Invalid author ID'));

    // Check if the author exists
    const author = await db('authors').where({ id }).first();
    if (!author) return res.status(404).json(notFoundErrorResponse('Author'));

    const deletedAuthor = await db('authors').where({ id }).del();
    console.log(deleteResponse);

    res.status(200).json(deleteResponse('Author'));
  } catch (error) {
    next(error);
  }
};
