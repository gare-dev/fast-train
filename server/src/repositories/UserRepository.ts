import prisma from "../db/connect";
import bcrypt from "bcrypt"
import { CreateUserDTO, LoginUser, PublicUserDTO } from "../db/models/UsersModel";

export class UserRepository {
    async create(user: Omit<CreateUserDTO, "idUser">): Promise<PublicUserDTO> {
        const createdUser = await prisma.users.create({
            data: user
        });
        return this.toPublicDTO(createdUser)

    }

    async findByEmail(email: string): Promise<PublicUserDTO | null> {
        return await prisma.users.findUnique({
            where: { email: email }
        })
    }

    async loginUser(email: string, password: string): Promise<LoginUser | null> {
        const user = await prisma.users.findUnique({
            where: { email: email }
        })

        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                return { name: user.name, email: user.email }
            }
        }
        return null
    }

    private toPublicDTO(user: CreateUserDTO): PublicUserDTO {
        const { idUser, name, email } = user
        return { idUser, name, email }
    }
}