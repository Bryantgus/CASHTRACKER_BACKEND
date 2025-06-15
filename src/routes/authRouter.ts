import { Router } from "express"
import AuthController from "../controllers/authController"


const router = Router()

router.post('/createAccount', AuthController.createAccount)

export default router