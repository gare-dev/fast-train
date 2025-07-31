import express from 'express'
import cors from "cors"
import { errorHandler } from '../middleware/errorHandler'
import UserRoutes from '../routes/UserRoutes'
import WorkoutRoutes from "../routes/WorkoutRoutes"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use(UserRoutes)
app.use(WorkoutRoutes)

app.use(errorHandler)

export default app