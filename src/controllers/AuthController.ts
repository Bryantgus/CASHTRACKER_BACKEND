import { Request, Response } from 'express'
import User from '../models/User'

export class AuthController {
  
    static createAccount = async (req: Request, res: Response) => {
        
        const { email } = req.body
        const userExists = await User.findOne({where: {email}})

        if(userExists) {
            const error = new Error('Un usuario con ese email ya esta registrado')
            res.status(409).json({error: error.message})
            return 
        }
        
        try {
            const user = new User(req.body)
            await user.save()
            res.json('Cuenta creada correctamente')
        } catch (error) {
            console.log(error);
            res.status(500).json({error: 'Hubo un error'})
            
        }
    }
}

export default AuthController