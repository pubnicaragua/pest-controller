import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './mongo'
import dotenv from 'dotenv'
import routes from '../routes'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { startAgenda } from './agenda'

dayjs.extend(utc)
dayjs.extend(timezone)

const app = express()

dotenv.config()

app.use(express.json({ limit: '30mb' }))
app.use(cors())
app.use(morgan('dev'))

app.use('/', routes)

app.set('PORT', process.env.PORT || 5000)

connectDB()
startAgenda()

export default app
