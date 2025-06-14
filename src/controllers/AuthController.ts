import { Request, Response } from 'express'
import User from '../models/User'
import { hashPassword } from '../utils/auth'
import { generateToken } from '../utils/token'

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
            const { password } = req.body
            const user = new User(req.body)
            user.password = await hashPassword(password)
            user.token = generateToken()
            await user.save()
            res.json('Cuenta creada correctamente')
            return
        } catch (error) {
            console.log(error);
            res.status(500).json({error: 'Hubo un error'})
            return
        }
    }
}

export default AuthController