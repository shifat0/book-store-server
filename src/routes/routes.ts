import { Router } from 'express';
import booksRouter from './books.routes';

// Initialize router
const router = Router();

// All routers
router.use(booksRouter);

export default router;
