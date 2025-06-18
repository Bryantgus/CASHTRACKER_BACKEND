import { BudgetController } from "../../controllers/BudgetController"
import { budgets } from "../mocks/budgets"
import { createMocks, createRequest, createResponse} from 'node-mocks-http'
import Budget from '../../models/Budget'

jest.mock('../../models/Budget', () => ({
    findAll: jest.fn()
}))

describe('BudgetController.getAll', () => {
    it('should retrieve 3 budgets', async () => {
        
        const req = createRequest({
            method: 'GET',
            url: '/api/budget',
            user: {id: 500}
        })

        const res = createResponse();

        (Budget.findAll as jest.Mock).mockResolvedValue(budgets)

        await BudgetController.getAll(req, res)
    })
})