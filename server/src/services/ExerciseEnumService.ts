import { JWTClass } from "../../utils/jwt";
import { Redis } from "../../utils/redis";
import { CreateExerciseEnumDTO } from "../db/models/ExerciseEnumModel";
import { CustomError } from "../errors/HttpError";
import { ExerciseEnumRepository } from "../repositories/ExerciseEnumRepository";


export class ExerciseEnumService {
    constructor(
        private repository: ExerciseEnumRepository,
        private jwtHandler: JWTClass,
        private redis: Redis
    ) { }

    async createExerciseEnum(exercise: Omit<CreateExerciseEnumDTO, "idUser">, token: string) {
        if (!exercise) throw new CustomError("Exercise is required.", 400, "EXERCISE_MISSING")
        if (!exercise.exerciseName) throw new CustomError("Exercise name is required.", 400, "EXERCISENAME_MISSING")
        if (!exercise.description) throw new CustomError("Exercise description is required.", 400, "EXERCISEDESC_MISSING")
        if (!exercise.muscle) throw new CustomError("Exercise muscle is required.", 400, "EXERCISEMUSCLE_MISSING")

        const jwt = this.jwtHandler.verifyJWT(token)
        const user = await this.redis.getRedis(jwt?.email!) as { email: string, idUser: number }

        return await this.repository.create({
            idUser: user.idUser,
            ...exercise
        })
    }

    async getExerciseEnum(token: string) {
        const jwt = this.jwtHandler.verifyJWT(token)
        const user = await this.redis.getRedis(jwt?.email!) as { idUser: number }

        const exerciseEnum = await this.repository.getExercisesEnum(user.idUser)

        if (!exerciseEnum) throw new CustomError("No exercise enum registered.", 400, "EMPTY_ENUM")

        return exerciseEnum
    }
}