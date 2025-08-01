import prisma from "../db/connect";
import { CreateExerciseEnumDTO, ExerciseEnumDTO } from "../db/models/ExerciseEnumModel";


export class ExerciseEnumRepository {
    async create(exercise: CreateExerciseEnumDTO): Promise<ExerciseEnumDTO> {
        return await prisma.exercisesEnum.create({
            data: exercise
        })
    }

    async getExercisesEnum(idUser: number): Promise<ExerciseEnumDTO[]> {
        return await prisma.exercisesEnum.findMany({
            where: {
                idUser: idUser
            }
        })
    }
}