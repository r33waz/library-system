import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const validateDto = (dtoClass: any) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dtoInstance = plainToInstance(dtoClass, req.body);

    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints || {}))
        .flat();

      let message = errorMessages.join(", ");

      // Capitalize first letter
      message = message.charAt(0).toUpperCase() + message.slice(1);

      res.status(400).json({
        status: false,
        httpCode: 400,
        message,
      });

      return;
    }

    next();
  };
};
