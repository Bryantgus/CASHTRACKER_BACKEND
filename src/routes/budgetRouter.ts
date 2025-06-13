import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'
import { body, param, validationResult } from 'express-validator'
import { handleInputsErrors } from '../middleware/validation'
import { validateBudgetExists, validateBudgetId, validateBudgetInput } from '../middleware/budget'
import { ExpensesController } from '../controllers/ExpensesController'
import { validateExpenseInput } from '../middleware/expense'
const router = Router()

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)

router.get('/', BudgetController.getAll)

router.post('/',
    validateBudgetInput,
    handleInputsErrors,
    BudgetController.create
)

router.get('/:budgetId', 
    handleInputsErrors,
    BudgetController.getById)

router.put('/:budgetId', 
    validateBudgetInput,
    handleInputsErrors,
    BudgetController.update)

router.delete('/:budgetId', 
    handleInputsErrors,
    BudgetController.deleteById)

//Routes for Expenses
router.post('/:budgetId/expenses', 
    validateExpenseInput,
    handleInputsErrors,
    ExpensesController.create)

router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)

router.put('/:budgetId/expenses/:expenseId', ExpensesController.updateById)

router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)



export default router