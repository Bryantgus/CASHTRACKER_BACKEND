import type { Request, Response, NextFunction } from "express";
import { param } from "express-validator";
import { handleInputsErrors } from "./validation";
import Budget from "../models/Budget";

declare global {
    namespace Express {
        interface Request {
            budget?: Budget
        }
    }
}
export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {
    await param('budgetId')
            .isInt().withMessage('ID no valido')
            .custom(value => value > 0).withMessage('ID no valido')
            .run(req),
    handleInputsErrors,
    next()
}

export const validateBudgetExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
            const { budgetId } = req.params
            const budget = await Budget.findByPk(budgetId)

            if (!budget) {
                const error = new Error('Presupuesto no encontrado')
                res.status(404).json({ error: error.message })
                return
            }
            req.budget = budget

            next()
        } catch (error) {
            // console.log(error);
            res.status(500).json({ error: "Hubo un error" })
        }
}