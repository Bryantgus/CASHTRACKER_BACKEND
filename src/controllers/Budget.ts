import { Request, Response  } from "express"

export class BudgetController {

    static getAll = async (req: Request, res: Response) => {
        console.log("Desde getAll");
    }

    static create = async (req: Request, res: Response) => {
        console.log("Desde create");
    }
}