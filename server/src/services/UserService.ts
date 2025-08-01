import { CreateUserDTO } from "../db/models/UsersModel";
import { CustomError } from "../errors/HttpError";
import { UserRepository } from "../repositories/UserRepository";
import hashPassword from "../../utils/hashPassword"
import bcrypt from "bcrypt"
import { JWTClass } from "../../utils/jwt"
import { Redis } from "../../utils/redis"

export class UserService {
    constructor(
        private repository: UserRepository,
        private jwtHandler: JWTClass,
        private redis: Redis
    ) { }

    async createUser(user: Omit<CreateUserDTO, "idUser">) {
        const existing = await this.repository.findByEmail(user.email)

        if (existing) {
            throw new CustomError("Email already used.", 400, "REPEATED_EMAIL")
        }

        const newUser = await this.repository.create({
            password: await hashPassword(user.password),
            email: user.email,
            name: user.name
        })

        return newUser
    }

    async loginUser(email: string, password: string) {
        const user = await this.repository.loginUser(email)

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new CustomError("Incorrect email or password.", 401, "INCORRECT_LOGIN")
        }

        this.redis.setRedis(user.email, { name: user.name, email: user.email, idUser: user.idUser }, 86400 * 2)
        return this.jwtHandler.generateJWT({ email: user.email })
    }
}