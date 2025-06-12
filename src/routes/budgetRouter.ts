import { Router } from 'express'
import { BudgetController } from '../controllers/Budget'
import { body, param, validationResult } from 'express-validator'
import { handleInputsErrors } from '../middleware/validation'
import { validateBudgetId } from '../middleware/budget'
const router = Router()

router.get('/', BudgetController.getAll)

router.post('/',
    body('name')
        .notEmpty().withMessage("El nombre del presupuesto no puede ir vacio"),
    body('amount')
        .notEmpty().withMessage("La cantidad del presupuesto no puede ir vacio")
        .isNumeric().withMessage('Cantidad no valida')
        .custom(value => value > 0).withMessage("El presupuesto debe ser mayor a 0"),
    handleInputsErrors,
    BudgetController.create
)

router.get('/:id',
    validateBudgetId,
    BudgetController.getById
)

router.put('/:id',
    validateBudgetId,
    body('amount')
        .notEmpty().withMessage("La cantidad del presupuesto no puede ir vacio")
        .isNumeric().withMessage('Cantidad no valida')
        .custom(value => value > 0).withMessage("El presupuesto debe ser mayor a 0"),
    handleInputsErrors,
    BudgetController.update
)

router.delete('/:id',
    validateBudgetId,
    BudgetController.deleteById
)

export default router