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
import { Authors, Books, IAuthorRow, IAuthorWithBooks } from '../types/types';

// Post Authors
export const postAuthorsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, bio, birthdate } = req.body;

    // Checking if a author exists with the same name
    const existingAuthor = await db<Authors>('authors').where({ name }).first();

    if (existingAuthor)
      return res.status(400).json(existsErrorResponse('Author'));

    // Create a new book
    const author = {
      name,
      bio,
      birthdate: new Date(birthdate),
    };

    // Insert the book into the database
    const result = await db<Authors>('authors').insert(author);

    const payload = {
      id: result[0],
      ...author,
    };

    res.status(201).json(createResponse<Authors>(payload, 'Author'));
  } catch (error: unknown) {
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
    // Parse pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    // Parse search parameters
    const searchQuery = (req.query.searchQuery as string) || '';

    // Query the database with pagination and search
    const authorsQuery = db<Authors>('authors')
      .select('*')
      .where('name', 'like', `%${searchQuery}%`)
      .offset(offset)
      .limit(limit);

    const countQuery = db('authors')
      .count({ count: '*' })
      .where('name', 'like', `%${searchQuery}%`);

    const [authors, countResult] = await Promise.all([
      authorsQuery,
      countQuery,
    ]);
    const totalCount = countResult[0].count as number;

    // Prepare pagination response
    const pagination = {
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      pageSize: limit,
      totalItems: totalCount,
    };

    res.status(200).json(getResponse<Authors[]>(authors, pagination));
  } catch (error: unknown) {
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
    const author = await db<Authors>('authors')
      .where({ id: Number(id) })
      .first();
    if (!author) return res.status(404).json(notFoundErrorResponse('Author'));

    res.status(200).json(getResponse<Authors>(author));
  } catch (error: unknown) {
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
    const author = await db<Authors>('authors')
      .where({ id: Number(id) })
      .first();
    if (!author) return res.status(404).json(notFoundErrorResponse('Author'));

    const updatedAuthor = {
      name,
      bio,
      birthdate: birthdate ? new Date(birthdate) : author.birthdate,
    };

    // Update the author
    const isUpdated = await db<Authors>('authors')
      .where({ id: Number(id) })
      .update(updatedAuthor);

    if (isUpdated !== 1)
      return res
        .status(500)
        .json(errorResponse('Author update failed due to server error!'));

    // Return the updated author
    res
      .status(200)
      .json(updateResponse<Omit<Authors, 'id'>>('Author', updatedAuthor));
  } catch (error: unknown) {
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
    const author = await db<Authors>('authors')
      .where({ id: Number(id) })
      .first();
    if (!author) return res.status(404).json(notFoundErrorResponse('Author'));

    // Deleting Author
    await db<Authors>('authors')
      .where({ id: Number(id) })
      .del();

    res.status(200).json(deleteResponse('Author'));
  } catch (error: unknown) {
    next(error);
  }
};

// Get all books by an author
export const getBooksByAuthorId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // Check if id is valid
    if (!id || isNaN(Number(id)))
      return res.status(400).json(errorResponse('Invalid author ID'));

    // Fetch author and books concurrently
    const [author, books] = await Promise.all([
      db<Authors>('authors')
        .where({ id: Number(id) })
        .first(),
      db<Books>('books').where({ author_id: id }),
    ]);

    // Check if author exists
    if (!author) {
      return res.status(404).json(notFoundErrorResponse('Author not found'));
    }

    res
      .status(200)
      .json(getResponse<IAuthorWithBooks>({ ...author, books: books }));
  } catch (error) {
    next(error);
  }
};

// Get All Authors with their books
export const getAuthorsWithBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorsWithBooksQuery = await db<Authors>('authors')
      .select(
        'authors.id as author_id',
        'authors.name as author_name',
        'authors.bio as author_bio',
        'authors.birthdate as author_birthdate',
        'books.id as book_id',
        'books.title as book_title',
        'books.description as book_description',
        'books.published_date as book_published_date',
      )
      .leftJoin('books', 'authors.id', '=', 'books.author_id')
      .orderBy('authors.id', 'asc');

    const authorsWithBooks = authorsWithBooksQuery.reduce(
      (acc: IAuthorWithBooks[], row: IAuthorRow) => {
        const author = acc.find((a) => a.id === row.author_id);
        if (author) {
          // If the author already exists in the accumulator, add the book (if it exists)
          if (row.book_id) {
            author.books.push({
              id: Number(row.book_id),
              title: row.book_title,
              description: row.book_description,
              published_date: row.book_published_date,
            });
          }
        } else {
          // Add a new author with their book (if any)
          acc.push({
            id: row.author_id,
            name: row.author_name,
            bio: row.author_bio,
            birthdate: row.author_birthdate,
            books: Number(row.book_id)
              ? [
                  {
                    id: row.book_id,
                    title: row.book_title,
                    description: row.book_description,
                    published_date: row.book_published_date,
                  },
                ]
              : [], // No books for this author
          });
        }
        return acc;
      },
      [],
    );

    res.status(200).json(getResponse(authorsWithBooks));
  } catch (error: unknown) {
    next(error);
  }
};
