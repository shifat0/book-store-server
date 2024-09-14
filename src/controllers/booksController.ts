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
import { Authors, Books } from '../types/types';

// Post books
export const postBooksController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, published_date, author_id } = req.body;

    // Checking if a author exists with the same name
    const existingBook = await db<Books>('books').where({ title }).first();
    if (existingBook) return res.status(400).json(existsErrorResponse('Book'));

    // Check if the author exists
    const author = await db<Authors>('authors')
      .where({ id: author_id })
      .first();
    if (!author)
      return res
        .status(404)
        .json(notFoundErrorResponse('Author with author_id'));

    // Create a new book
    const book = {
      title,
      description,
      published_date: new Date(published_date),
      author_id,
    };

    // Insert the book into the database
    const result = await db<Books>('books').insert(book);

    const newBook = {
      id: result[0],
      ...book,
    };

    // Return the created book with a 201 status code
    res.status(201).json(createResponse<Books>(newBook, 'Book'));
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
    // Parseing query params
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    // Parse search params
    const authorId = (req.query.author as string) || '';
    const searchQuery = (req.query.searchQuery as string) || '';

    // Query the database with pagination and search
    const booksQuery = db<Books>('books')
      .select('*')
      .where('author_id', authorId)
      .andWhere(function () {
        this.where('title', 'like', `%${searchQuery}%`).orWhere(
          'description',
          'like',
          `%{searchQuery}%`,
        );
      })
      .offset(offset)
      .limit(limit);

    const countQuery = db<Books>('books')
      .count({ count: '*' })
      .where('author_id', authorId)
      .andWhere(function () {
        this.where('title', 'like', `%${searchQuery}%`).orWhere(
          'description',
          'like',
          `%{searchQuery}%`,
        );
      });

    const [books, countResult] = await Promise.all([booksQuery, countQuery]);
    const totalCount = countResult[0].count as number;

    // Pagination response
    const pagination = {
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      pageSize: limit,
      totalItems: totalCount,
    };

    res.status(200).json(getResponse<Books[]>(books, pagination));
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

    // Fetch books from db
    const book = await db('books')
      .select(
        'books.id as id',
        'books.title',
        'books.description',
        'books.published_date',
        'authors.id as author_id',
        'authors.name as author_name',
        'authors.bio as author_bio',
        'authors.birthdate as author_birthdate',
      )
      .leftJoin('authors', 'books.author_id', 'authors.id')
      .where('books.id', id)
      .first();

    // Check if a book exists
    if (!book) return res.status(404).json(notFoundErrorResponse('Book'));

    // Destructuring author info from the response of db
    const {
      author_id,
      author_name,
      author_bio,
      author_birthdate,
      ...bookProperties
    } = book;

    // New book Response with author details
    const bookResponse = {
      ...bookProperties,
      author: {
        id: author_id,
        name: author_name,
        bio: author_bio,
        author_birthdate: author_birthdate,
      },
    };

    res.status(200).json(getResponse<Books>(bookResponse));
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
    const { title, description, published_date, author_id } = req.body;

    // Check if the id is valid
    if (!id || isNaN(Number(id)))
      return res.status(400).json(errorResponse('Invalid book ID'));

    // Check if the book exists
    const book = await db<Books>('books')
      .where({ id: Number(id) })
      .first();
    if (!book) return res.status(404).json(notFoundErrorResponse('Book'));

    const updatedBook = {
      title,
      description,
      published_date: published_date
        ? new Date(published_date)
        : book.published_date,
      author_id,
    };

    // Update the book
    const isUpdated = await db('books').where({ id }).update(updatedBook);

    if (isUpdated !== 1)
      return res
        .status(500)
        .json(errorResponse('Book update failed due to server error!'));

    // Return the updated author
    res
      .status(200)
      .json(updateResponse<Omit<Books, 'id'>>('Book', updatedBook));
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
    const book = await db<Books>('books')
      .where({ id: Number(id) })
      .first();
    if (!book) return res.status(404).json(notFoundErrorResponse('book'));

    // Deleting Book
    await db('books').where({ id }).del();

    res.status(200).json(deleteResponse('Book'));
  } catch (error) {
    next(error);
  }
};
