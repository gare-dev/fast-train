import express, { Response, Request } from "express"
import { ExerciseEnumService } from "../services/ExerciseEnumService"
import { ExerciseEnumRepository } from "../repositories/ExerciseEnumRepository"
import { JWTClass } from "../../utils/jwt"
import { Redis } from "../../utils/redis"

const router = express.Router()
const service = new ExerciseEnumService(new ExerciseEnumRepository(), new JWTClass(process.env.JWT_TOKEN!), new Redis())

router.post("/exercise/enum", async (req: Request, res: Response) => {
    const { exerciseName, muscle, description } = req.body
    const token = req.cookies.token

    const newExerciseEnum = await service.createExerciseEnum({ exerciseName, muscle, description }, token)

    return res.status(201).json({
        message: "Exercise enum created successfully!",
        code: "ENUM_CREATED",
        data: newExerciseEnum
    })
})

router.get("/exercise/enum", async (req: Request, res: Response) => {
    const token = req.cookies.token

    const exerciseEnum = await service.getExerciseEnum(token)

    return res.status(201).json({
        message: "Exercise enum found.",
        code: "ENUM_SUCCESS",
        data: exerciseEnum
    })
})

export default router