import { Router } from "express"
import { body } from 'express-validator'
import { handleInputsErrors } from "../middleware/validation"
import AuthController from "../controllers/AuthController"
import { limiter } from "../config/limiter"


const router = Router()

router.post('/createAccount',
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password')
        .isLength({ min: 8 }).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('email')
        .isEmail().withMessage('Email no valido'),
    handleInputsErrors,
    AuthController.createAccount
)

router.post('/confirm-account',
    limiter,
    body('token')
        .notEmpty()
        .isLength({ min: 6, max: 6 })
        .withMessage("Token no valido"),
    AuthController.confirmAccount
)
export default router