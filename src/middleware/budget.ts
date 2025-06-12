import type { Request, Response, NextFunction } from "express";
import { param } from "express-validator";
import { handleInputsErrors } from "./validation";

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {
    await param('id')
            .isInt().withMessage('ID no valido')
            .custom(value => value > 0).withMessage('ID no valido')
            .run(req),
    handleInputsErrors,
    next()
}