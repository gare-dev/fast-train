import express from 'express'
import cors from "cors"
import { errorHandler } from '../middleware/errorHandler'
import UserRoutes from '../routes/UserRoutes'


const app = express()

app.use(cors())
app.use(express.json())

app.use(UserRoutes)

app.use(errorHandler)

export default app