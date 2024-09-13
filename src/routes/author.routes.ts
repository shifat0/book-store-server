import { Router } from 'express';
import {
  deleteAuthorController,
  getAuthorsController,
  getAuthorsWithBooks,
  getBooksByAuthorId,
  getSingleAuthorController,
  postAuthorsController,
  updateAuthorController,
} from '../controllers/authorControllers';
import validate from '../middlewares/validate';
import authorValidator from '../validators/authorValidator';

const authorsRouter = Router();

authorsRouter
  .route('/authors')
  .post(validate(authorValidator()), postAuthorsController)
  .get(getAuthorsController);

authorsRouter
  .route('/authors/:id')
  .get(getSingleAuthorController)
  .put(validate(authorValidator()), updateAuthorController)
  .delete(deleteAuthorController);

authorsRouter.get('/authors/:id/books', getBooksByAuthorId);
authorsRouter.get('/authors-with-books', getAuthorsWithBooks);

export default authorsRouter;
