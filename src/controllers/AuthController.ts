import { Request, Response } from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import { checkPassword, hashPassword } from '../utils/auth'
import { generateToken } from '../utils/token'
import { AuthEmail } from '../emails/AuthEmail'
import { generateJWT } from '../utils/jwt'
import { addAttribute } from 'sequelize-typescript'

export class AuthController {

    static createAccount = async (req: Request, res: Response) => {

        const { email } = req.body
        const userExists = await User.findOne({ where: { email } })

        if (userExists) {
            const error = new Error('Un usuario con ese email ya esta registrado')
            res.status(409).json({ error: error.message })
            return
        }

        try {
            const { password } = req.body
            const user = new User(req.body)
            user.password = await hashPassword(password)
            user.token = generateToken()
            await user.save()

            await AuthEmail.sendConfirmationEmail({
                name: user.name,
                email: user.email,
                token: user.token
            })
            res.json('Cuenta creada correctamente')
            return
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error' })
            return
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        const { token } = req.body

        const user = await User.findOne({ where: { token } })
        if (!user) {
            const error = new Error('Token no valido')
            res.status(401).json({ error: error.message })
            return
        }

        user.confirmed = true
        user.token = null
        await user.save()
        res.json("Cuenta confirmada correctamente")

    }

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })

        if (!user) {
            const error = new Error('Usuario no encontrado')
            res.status(409).json({ error: error.message })
            return
        }

        if (!user.confirmed) {
            const error = new Error('La cuenta no ha sido confirmada')
            res.status(403).json({ error: error.message })
            return
        }

        const isPasswordCorrect = checkPassword(password, user.password)
        if (!isPasswordCorrect) {
            const error = new Error('La cuenta no ha sido confirmada')
            res.status(401).json({ error: error.message })
            return
        }

        const token = generateJWT(user.id)
        res.json(token)

    }

    static forgotPassword = async (req: Request, res: Response) => {
        const { email } = req.body
        const user = await User.findOne({ where: { email } })

        if (!user) {
            const error = new Error('Usuario no encontrado')
            res.status(409).json({ error: error.message })
            return
        }

        user.token = generateToken()
        await user.save()
        await AuthEmail.sendPasswordResetToken({
            name: user.name,
            email: user.email,
            token: user.token
        })
        res.json('Revisa tu email para instrucciones')
    }

    static validateToken = async (req: Request, res: Response) => {
        const { token } = req.body
        const tokenExists = await User.findOne({ where: { token } })

        if (!tokenExists) {
            const error = new Error('Token no valido')
            res.status(404).json({ error: error.message })
            return
        }
        res.json("Token valido...");
    }

    static resetPasswordWithToken = async (req: Request, res: Response) => {
        const { token } = req.params
        const { password } = req.body
        const user = await User.findOne({ where: { token } })
        if (!user) {
            const error = new Error('Token no valido')
            res.status(404).json({ error: error.message })
            return
        }
        user.password = await hashPassword(password)
        user.token = null
        await user.save()
        res.json('El password se modifico correctamente')
    }

    static user = async (req: Request, res: Response) => {
        res.json(req.user)
    }

    static updateCurrentUserPassword = async (req: Request, res: Response) => {
        const { current_password, password } = req.body
        const { id } = req.user

        const user = await User.findByPk(id)

        const isPasswordCorrect = await checkPassword(current_password, user.password)
        if (!isPasswordCorrect) {
            const error = new Error('El password actual es incorrecto')
            res.status(401).json({ error: error.message })
            return
        }

        user.password = await hashPassword(password)
        user.save()
        res.json('Password actualizado correctamente')
        return
    }

    static checkPassword = async (req: Request, res: Response) => {
        const { current_password, password } = req.body
        const { id } = req.user

        const user = await User.findByPk(id)

        const isPasswordCorrect = await checkPassword(password, user.password)
        if (!isPasswordCorrect) {
            const error = new Error('El password actual es incorrecto')
            res.status(401).json({ error: error.message })
            return
        }
        res.json('Password correcto')
        return
    }

    


}

export default AuthController