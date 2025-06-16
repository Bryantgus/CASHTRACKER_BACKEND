import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { connectDB } from './config/db'
import budgetRouter from './routes/budgetRouter'
import authRouter from './routes/authRouter'
import { limiter } from './config/limiter'

connectDB()
const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/budget', budgetRouter)
app.use('/api/auth', authRouter)


export default app