import { body, ValidationChain } from 'express-validator';

export default function bookValidator(): ValidationChain[] {
  return [
    body('title')
      .notEmpty()
      .withMessage('Title is required.')
      .isString()
      .withMessage('Title must be a string.'),

    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string.'),

    body('published_date')
      .notEmpty()
      .withMessage('Published date is required.')
      .isString()
      .withMessage(
        'Published date must be a valid date in the format YYYY-MM-DD.',
      ),

    body('author_id')
      .notEmpty()
      .withMessage('Author ID is required.')
      .isInt({ gt: 0 })
      .withMessage('Author ID must be a positive integer.'),
  ];
}
