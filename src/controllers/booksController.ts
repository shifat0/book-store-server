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

// Post books
export const postBooksController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, publishedDate, authorId } = req.body;

    // Checking if a author exists with the same name
    const existingBook = await db('books').where({ title }).first();
    if (existingBook) return res.status(400).json(existsErrorResponse('Book'));

    // Check if the author exists
    const author = await db('authors').where({ id: authorId }).first();
    if (!author)
      return res
        .status(404)
        .json(notFoundErrorResponse('Author with authorId'));

    // Create a new book
    const book = {
      title,
      description,
      publishedDate: new Date(publishedDate),
      authorId,
    };

    // Insert the book into the database
    const result = await db('books').insert(book);

    const newBook = {
      id: result[0],
      ...book,
    };

    // Return the created book with a 201 status code
    res.status(201).json(createResponse(newBook, 'Book'));
  } catch (error) {
    next(error);
  }
};

// Get  books
export const getBooksController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const books = await db('books').select('*');

    //Check if book exists
    if (!books) return res.status(404).json(notFoundErrorResponse());

    res.status(200).json(getResponse(books));
  } catch (error) {
    next(error);
  }
};

// Get book by id
export const getSingleBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // Check if id is valid
    if (!id || isNaN(Number(id)))
      return res.status(400).json(errorResponse('Invalid book ID'));

    // Check if the book exists
    const book = await db('books').where({ id }).first();
    if (!book) return res.status(404).json(notFoundErrorResponse('Book'));

    res.status(200).json(getResponse(book));
  } catch (error) {
    next(error);
  }
};

// update book
export const updateBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { title, description, publishedDate, authorId } = req.body;

    // Check if the id is valid
    if (!id || isNaN(Number(id)))
      return res.status(400).json(errorResponse('Invalid book ID'));

    // Check if the book exists
    const book = await db('books').where({ id }).first();
    if (!book) return res.status(404).json(notFoundErrorResponse('Book'));

    const updatedBook = {
      title,
      description,
      publishedDate: publishedDate
        ? new Date(publishedDate)
        : book.publishedDate,
      authorId,
    };

    // Update the book
    const isUpdated = await db('books').where({ id }).update(updatedBook);

    if (isUpdated !== 1)
      return res
        .status(500)
        .json(errorResponse('Book update failed due to server error!'));

    // Return the updated author
    res.status(200).json(updateResponse('Book', updatedBook));
  } catch (error) {
    next(error);
  }
};

// delete book
export const deleteBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // Check if id is valid
    if (!id || isNaN(Number(id)))
      return res.status(400).json(errorResponse('Invalid book ID'));

    // Check if the book exists
    const book = await db('books').where({ id }).first();
    if (!book) return res.status(404).json(notFoundErrorResponse('book'));

    // Deleting Book
    await db('books').where({ id }).del();

    res.status(200).json(deleteResponse('Book'));
  } catch (error) {
    next(error);
  }
};
