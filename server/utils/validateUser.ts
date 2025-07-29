import { CreateUserDTO, fullSchema, loginSchema, LoginUser } from "../src/db/models/UsersModel";

export function validateUser(data: Omit<CreateUserDTO, "idUser">) {
    return fullSchema.safeParse(data)
}

export function validateLogin(data: Omit<CreateUserDTO, "idUser" | "name">) {
    return loginSchema.safeParse(data)
}