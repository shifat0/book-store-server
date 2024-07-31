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

    body('publishedDate')
      .notEmpty()
      .withMessage('Published date is required.')
      .isString()
      .withMessage(
        'Published date must be a valid date in the format YYYY-MM-DD.',
      ),

    body('authorId')
      .notEmpty()
      .withMessage('Author ID is required.')
      .isInt({ gt: 0 })
      .withMessage('Author ID must be a positive integer.'),
  ];
}
