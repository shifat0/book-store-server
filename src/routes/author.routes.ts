import { Router } from 'express';
import {
  deleteAuthorController,
  getAuthorsController,
  getSingleAuthorController,
  postAuthorsController,
  updateAuthorController,
} from '../controllers/authorControllers';

const authorsRouter = Router();

authorsRouter
  .route('/authors')
  .post(postAuthorsController)
  .get(getAuthorsController);

authorsRouter
  .route('/authors/:id')
  .get(getSingleAuthorController)
  .put(updateAuthorController)
  .delete(deleteAuthorController);

export default authorsRouter;
