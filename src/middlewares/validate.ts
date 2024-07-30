import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export default function validate(schema: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(schema.map((rule) => rule.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  };
}
