import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { connectDB } from './config/db'

connectDB()
const app = express()

app.use(morgan('dev'))

app.use(express.json())



export default app