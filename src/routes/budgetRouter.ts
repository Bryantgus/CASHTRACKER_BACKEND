import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'
import { body, param, validationResult } from 'express-validator'
import { handleInputsErrors } from '../middleware/validation'
import { validateBudgetExists, validateBudgetId } from '../middleware/budget'
const router = Router()

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)

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

router.get('/:budgetId', BudgetController.getById)

router.put('/:budgetId', BudgetController.update)

router.delete('/:budgetId', BudgetController.deleteById)

export default router