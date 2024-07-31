import { Router } from 'express';
import {
  deleteBookController,
  getBooksByAuthorId,
  getBooksController,
  getSingleBookController,
  postBooksController,
  updateBookController,
} from '../controllers/booksController';
import validate from '../middlewares/validate';
import bookValidator from '../validators/bookValidator';

const booksRouter = Router();

booksRouter
  .route('/books')
  .post(validate(bookValidator()), postBooksController)
  .get(getBooksController);

booksRouter
  .route('/books/:id')
  .get(getSingleBookController)
  .put(validate(bookValidator()), updateBookController)
  .delete(deleteBookController);

booksRouter.get('/books/author/:id', getBooksByAuthorId);

export default booksRouter;
