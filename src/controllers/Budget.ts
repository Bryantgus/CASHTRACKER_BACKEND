import { Request, Response  } from "express"

export class BudgetController {

    static getAll = async (req: Request, res: Response) => {
        console.log("Desde getAll");
    }

    static create = async (req: Request, res: Response) => {
        console.log("Desde create");
    }

    static getById = async (req: Request, res: Response) => {
        console.log("Desde getById");
    }

    static update = async (req: Request, res: Response) => {
        console.log("Desde update");
    }

    static deleteById = async (req: Request, res: Response) => {
        console.log("Desde deleteById");
    }
}