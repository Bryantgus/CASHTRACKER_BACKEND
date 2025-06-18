import { BudgetController } from "../../controllers/BudgetController"
import { budgets } from "../mocks/budgets"
import { createMocks, createRequest, createResponse} from 'node-mocks-http'
describe('BudgetController.getAll', () => {
    it('should retrieve 3 budgets', async () => {
        
        const req = createRequest({
            method: 'GET',
            url: '/api/budget'
        })

        const res = createResponse()

        await BudgetController.getAll(req, res)
    })
})