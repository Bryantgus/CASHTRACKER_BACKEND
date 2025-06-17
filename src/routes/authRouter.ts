import { Router } from "express"
import { body, param } from 'express-validator'
import { handleInputsErrors } from "../middleware/validation"
import AuthController from "../controllers/AuthController"
import { limiter } from "../config/limiter"
import { authenticate } from "../middleware/auth"


const router = Router()

router.use(limiter)

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
    body('token')
        .notEmpty()
        .isLength({ min: 6, max: 6 })
        .withMessage("Token no valido"),
    handleInputsErrors,
    AuthController.confirmAccount
)

router.post('/login',
    body('email')
        .isEmail().withMessage('Email no valido'),
    body('password')
        .notEmpty().withMessage('El password es obligatorio'),
    handleInputsErrors,
    AuthController.login
)

router.post('/forgot-password',
    body('email')
        .isEmail().withMessage('Email no valido'),
    handleInputsErrors,
    AuthController.forgotPassword
)

router.post('/validate-token',
    body('token')
        .notEmpty()
        .isLength({ min: 6, max: 6 })
        .withMessage("Token no valido"),
    handleInputsErrors,
    AuthController.validateToken
)

router.post('/reset-password/:token',
    param('token')
        .notEmpty()
        .isLength({min:6, max:6})
        .withMessage('Token no valido'),
    body('password')
        .isLength({min:8}).withMessage('El password es muy corto, minimo 8 caracteres'),
    handleInputsErrors,
    AuthController.resetPasswordWithToken
)

router.get('/user', 
    authenticate,
    AuthController.user
)
export default router