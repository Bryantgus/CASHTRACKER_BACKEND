import { Router } from "express"
import AuthController from "../controllers/authController"

import { body } from 'express-validator'
import { handleInputsErrors } from "../middleware/validation"


const router = Router()

router.post('/createAccount',
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password')
        .isLength({min:8}).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('email')
        .isEmail().withMessage('Email no valido'),
    handleInputsErrors,
    AuthController.createAccount)

export default router