
import express, { Request, Response } from "express"
import { WorkoutService } from "../services/WorkoutService"
import { WorkoutRepository } from "../repositories/WorkoutRepository"
import { JWTClass } from "../../utils/jwt"
import { Redis } from "../../utils/redis"


const router = express.Router()
const service = new WorkoutService(new WorkoutRepository(), new JWTClass(process.env.JWT_TOKEN!), new Redis())

router.post("/workout", async (req, res: Response) => {
    const { workoutName } = req.body
    const token = req.cookies.token

    const newWorkout = await service.createWorkout({ workoutName }, token)

    return res.status(201).json({
        message: "Workout created successfully!",
        code: "WORKOUT_CREATED",
        data: newWorkout
    })

})

export default router