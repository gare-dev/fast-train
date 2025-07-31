import { CreateWorkoutDTO, WorkoutDTO } from "../db/models/WorkoutModel";
import prisma from "../db/connect";

export class WorkoutRepository {
    async create(workout: CreateWorkoutDTO): Promise<WorkoutDTO> {
        return await prisma.workouts.create({
            data: workout
        })
    }

    async getWorkouts(idUser: number): Promise<WorkoutDTO[]> {
        return await prisma.workouts.findMany({
            where: {
                idUser: idUser
            }
        })

    }
}