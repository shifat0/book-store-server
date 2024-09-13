import { body, ValidationChain } from 'express-validator';

export default function authorValidator(): ValidationChain[] {
  return [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isString()
      .withMessage('Name must be a string'),
    body('bio').optional().isString().withMessage('Bio must be a string'),
    body('birthdate')
      .notEmpty()
      .withMessage('Birthdate is required')
      .isString()
      .withMessage('Birthdate must be a valid string'),
  ];
}
