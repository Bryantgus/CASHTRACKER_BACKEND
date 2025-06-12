import { Router } from 'express'
import { BudgetController } from '../controllers/Budget'
import { body, validationResult } from 'express-validator'
import { handleInputsErrors } from '../middleware/validation'
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

router.get('/:id', BudgetController.getById)

router.put('/:id', BudgetController.update)

router.delete('/:id', BudgetController.deleteById)

export default router