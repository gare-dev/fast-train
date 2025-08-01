import z from "zod"

export const fullWorkoutExerciseSchema = z.object({
    idWorkoutExercise: z.number().int().optional(),
    idWorkout: z.number().int("MISSING_IDWORKOUT"),
    idExercise: z.number().int("MISSING_IDEXERCISE")
})

export type WorkoutExerciseDTO = z.infer<typeof fullWorkoutExerciseSchema>
export type CreateWorkoutExerciseDTO = Omit<WorkoutExerciseDTO, "idWorkoutExercise">