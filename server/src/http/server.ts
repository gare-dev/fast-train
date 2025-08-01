import express from 'express'
import cors from "cors"
import { errorHandler } from '../middleware/errorHandler'
import UserRoutes from '../routes/UserRoutes'
import WorkoutRoutes from "../routes/WorkoutRoutes"
import ExerciseEnumRoutes from "../routes/ExerciseEnumRoutes"
import WorkoutExerciseRoutes from "../routes/WorkoutExerciseRoutes"
import cookieParser from "cookie-parser"
import { unauthenticatedMiddleware } from '../middleware/unauthenticated'
import { Redis } from '../../utils/redis'
import { JWTClass } from '../../utils/jwt'


const app = express()
const redis = new Redis()
const jwt = new JWTClass(process.env.JWT_TOKEN!)

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use(UserRoutes)
app.use(unauthenticatedMiddleware(jwt, redis), WorkoutRoutes)
app.use(unauthenticatedMiddleware(jwt, redis), ExerciseEnumRoutes)
app.use(unauthenticatedMiddleware(jwt, redis), WorkoutExerciseRoutes)


app.use(errorHandler)

export default app