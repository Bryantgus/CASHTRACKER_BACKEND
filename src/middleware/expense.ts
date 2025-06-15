import type { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { handleInputsErrors } from "./validation";
import Budget from "../models/Budget";
import Expense from "../models/Expense";

declare global {
    namespace Express {
        interface Request {
            expense?: Expense
        }
    }
}
export const validateExpensetId = async (req: Request, res: Response, next: NextFunction) => {
    await param('expenseId')
        .isInt().withMessage('ID no valido')
        .custom(value => value > 0).withMessage('ID no valido')
        .run(req)
    next()
}

export const validateExpensetExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { expenseId } = req.params
        const expense = await Expense.findByPk(expenseId)

        if (!expense) {
            const error = new Error('Presupuesto no encontrado')
            res.status(404).json({ error: error.message })
            return
        }
        req.expense = expense

        next()
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: "Hubo un error" })
    }
}

export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {

    await body('name')
        .notEmpty().withMessage("El nombre del gasto no puede ir vacio")
        .run(req)
    await body('amount')
        .notEmpty().withMessage("La cantidad del gasto no puede ir vacio")
        .isNumeric().withMessage('Cantidad no valida')
        .custom(value => value > 0).withMessage("El gasto debe ser mayor a 0")
        .run(req)
    next()
    
}