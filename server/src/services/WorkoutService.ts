import { JWTClass } from "../../utils/jwt";
import { Redis } from "../../utils/redis";
import { CreateWorkoutDTO } from "../db/models/WorkoutModel";
import { CustomError } from "../errors/HttpError";
import { WorkoutRepository } from "../repositories/WorkoutRepository";

export class WorkoutService {
    constructor(
        private repository: WorkoutRepository,
        private jwtHandler: JWTClass,
        private redis: Redis
    ) { }

    async createWorkout(workout: Omit<CreateWorkoutDTO, "idUser">, token: string) {
        if (!workout) throw new CustomError("Workout is required.", 400, "WORKOUT_MISSING")

        const jwt = this.jwtHandler.verifyJWT(token)
        const user = await this.redis.getRedis(jwt?.email!) as { email: string, idUser: number, name: string }

        return await this.repository.create({
            idUser: user.idUser,
            workoutName: workout.workoutName
        })
    }
}