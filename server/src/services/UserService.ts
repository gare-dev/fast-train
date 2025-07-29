import { CreateUserDTO } from "../db/models/UsersModel";
import { CustomError } from "../errors/HttpError";
import { UserRepository } from "../repositories/UserRepository";
import hashPassword from "../../utils/hashPassword"


export class UserService {
    constructor(private repository: UserRepository) { }

    async createUser(user: Omit<CreateUserDTO, "idUser">) {
        const existing = await this.repository.findByEmail(user.email)

        if (existing) {
            return new CustomError("Email already used.", 400, "REPEATED_EMAIL")
        }

        const newUser = await this.repository.create({
            password: await hashPassword(user.password),
            email: user.email,
            name: user.name
        })

        return newUser
    }

    async loginUser(email: string, password: string) {
        const login = await this.repository.loginUser(email, password)

        if (login) return login

        return null
    }
}