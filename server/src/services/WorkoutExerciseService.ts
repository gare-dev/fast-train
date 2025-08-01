import { Prisma } from "@prisma/client";
import { JWTClass } from "../../utils/jwt";
import { Redis } from "../../utils/redis";
import { CreateWorkoutExerciseDTO } from "../db/models/WorkoutExerciseModel";
import { CustomError } from "../errors/HttpError";
import { WorkoutExerciseRepository } from "../repositories/WorkoutExerciseRepository";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";


export class WorkoutExerciseService {
    constructor(
        private repository: WorkoutExerciseRepository,
        private jwtHandler: JWTClass,
        private redis: Redis
    ) { }

    async createWorkoutExercise(workoutExercise: CreateWorkoutExerciseDTO, token: string) {
        if (!workoutExercise) throw new CustomError("Workout Exercises is required.", 400, "WORKOUTEXERCISE_MISSING")
        if (!workoutExercise.idExercise) throw new CustomError("ID Exercise is required.", 400, "IDEXERCISE_MISSING")
        if (!workoutExercise.idWorkout) throw new CustomError("ID Workout is required.", 400, "IDWORKOUT_MISSING")

        const jwt = this.jwtHandler.verifyJWT(token)
        const user = await this.redis.getRedis(jwt?.email!) as { idUser: number }

        if (!await this.repository.getUserWorkout(user.idUser, workoutExercise.idWorkout)) throw new CustomError("This workout does not exist.", 400, "NONEXISTENT_WORKOUT")

        return await this.repository.create(workoutExercise)
    }
}