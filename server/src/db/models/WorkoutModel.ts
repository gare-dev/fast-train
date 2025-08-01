import z from "zod"

export const fullWorkoutSchema = z.object({
    idWorkout: z.number().int(),
    idUser: z.number().int("IDUSER_NULL"),
    workoutName: z.string("WORKOUTNAME_NULL"),
    date: z.date().optional()
})

export type WorkoutDTO = z.infer<typeof fullWorkoutSchema>
export type CreateWorkoutDTO = Omit<WorkoutDTO, "idWorkout" | "date">