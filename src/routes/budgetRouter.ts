import { Router } from 'express'
import { BudgetController } from '../controllers/Budget'

const router = Router()

router.get('/', BudgetController.getAll)
router.post('/', BudgetController.create)

export default router