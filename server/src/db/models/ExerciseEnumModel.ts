import z from "zod"

export const fullExerciseEnumSchema = z.object({
    idExercise: z.number().int().optional(),
    idUser: z.number().int("MISSING_IDUSER"),
    exerciseName: z.string("MISSING_EXERCISENAME"),
    muscle: z.string("MISSING_MUSCLE"),
    description: z.string("MISSING_DESCRIPTION"),
})

export type ExerciseEnumDTO = z.infer<typeof fullExerciseEnumSchema>
export type CreateExerciseEnumDTO = Omit<ExerciseEnumDTO, "idExercise">