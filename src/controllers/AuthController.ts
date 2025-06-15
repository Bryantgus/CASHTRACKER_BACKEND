import { Request, Response } from 'express'

export class AuthController {
  
    static createAccount = async (req: Request, res: Response) => {
        res.json("Desde create account")
    }
}

export default AuthController