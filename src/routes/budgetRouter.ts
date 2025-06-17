import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'
import { body, param, validationResult } from 'express-validator'
import { handleInputsErrors } from '../middleware/validation'
import { validateBudgetExists, validateBudgetId, validateBudgetInput } from '../middleware/budget'
import { ExpensesController } from '../controllers/ExpensesController'
import { validateExpenseInput, validateExpensetExists, validateExpensetId } from '../middleware/expense'
import { authenticate } from '../middleware/auth'
const router = Router()

router.use(authenticate)

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)

router.param('expenseId', validateExpensetId)
router.param('expenseId', validateExpensetExists)


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

router.get('/:budgetId/expenses/:expenseId', 
    handleInputsErrors,
    ExpensesController.getById)

router.put('/:budgetId/expenses/:expenseId', 
    validateExpenseInput,
    handleInputsErrors,
    ExpensesController.updateById)

router.delete('/:budgetId/expenses/:expenseId', 
    handleInputsErrors,
    ExpensesController.deleteById)



export default router