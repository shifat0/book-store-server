import { Router } from 'express';
import booksRouter from './books.routes';
import authorsRouter from './author.routes';

// Initialize router
const router = Router();

// All routers
router.use(booksRouter);
router.use(authorsRouter);

export default router;
