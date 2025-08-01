import express, { Request, Response } from "express"
import { WorkoutExerciseService } from "../services/WorkoutExerciseService"
import { WorkoutExerciseRepository } from "../repositories/WorkoutExerciseRepository"
import { JWTClass } from "../../utils/jwt"
import { Redis } from "../../utils/redis"

const routes = express.Router()
const service = new WorkoutExerciseService(new WorkoutExerciseRepository(), new JWTClass(process.env.JWT_TOKEN!), new Redis())

routes.post("/workout/exercise", async (req: Request, res: Response) => {
    const { idWorkout, idExercise } = req.body
    const token = req.cookies.token

    const newWorkoutExercise = await service.createWorkoutExercise({ idExercise, idWorkout }, token)

    return res.status(201).json({
        message: "Workout exercise created successfully!",
        code: "WORKOUTEXERCISE_CREATED",
        data: newWorkoutExercise
    })

})

export default routes