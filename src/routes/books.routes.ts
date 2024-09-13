import { Router } from 'express';
import {
  deleteBookController,
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

export default booksRouter;
