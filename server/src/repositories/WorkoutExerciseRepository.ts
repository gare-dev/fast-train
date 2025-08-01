import prisma from "../db/connect";
import { CreateWorkoutExerciseDTO, WorkoutExerciseDTO } from "../db/models/WorkoutExerciseModel";


export class WorkoutExerciseRepository {
    async create(workoutExercise: CreateWorkoutExerciseDTO): Promise<WorkoutExerciseDTO> {
        return await prisma.workoutExercises.create({
            data: workoutExercise,
        })
    }

    async getUserWorkout(idUser: number, idWorkout: number): Promise<boolean> {
        const workout = await prisma.workouts.findFirst({
            where: {
                idWorkout,
                idUser
            }
        })

        return !!workout
    }
}