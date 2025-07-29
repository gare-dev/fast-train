import z from "zod";

export const fullSchema = z.object({
    idUser: z.number().int().optional(),
    name: z.string().min(3, "INVALID_NAME"),
    email: z.email("INVALID_EMAIL"),
    password: z.string().min(4, "PWD_MIN_CHAR")
})

export const loginSchema = fullSchema.omit({ idUser: true, name: true })

export type CreateUserDTO = z.infer<typeof fullSchema>
export type LoginUser = Omit<CreateUserDTO, "password" | "idUser">
export type PublicUserDTO = Omit<CreateUserDTO, "password">