import { Router } from 'express';
import {
  deleteBookController,
  getBooksController,
  getSingleBookController,
  postBooksController,
  updateBookController,
} from '../controllers/booksController';

const booksRouter = Router();

booksRouter.route('/books').post(postBooksController).get(getBooksController);

booksRouter
  .route('/books/:id')
  .get(getSingleBookController)
  .put(updateBookController)
  .delete(deleteBookController);

export default booksRouter;
