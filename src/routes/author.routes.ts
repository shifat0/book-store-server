import { Router } from 'express';
import {
  deleteAuthorController,
  getAuthorsController,
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

export default authorsRouter;
