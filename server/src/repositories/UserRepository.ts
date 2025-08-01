import prisma from "../db/connect";
import { CreateUserDTO, LoginUser, PublicUserDTO } from "../db/models/UsersModel";

export class UserRepository {
    async create(user: Omit<CreateUserDTO, "idUser">): Promise<PublicUserDTO> {
        return this.toPublicDTO(await prisma.users.create({
            data: user
        }));
    }

    async findByEmail(email: string): Promise<PublicUserDTO | null> {
        return await prisma.users.findUnique({
            where: { email: email }
        })
    }

    async loginUser(email: string,): Promise<CreateUserDTO | null> {
        return await prisma.users.findUnique({
            where: { email: email }
        })
    }

    private toPublicDTO(user: CreateUserDTO): PublicUserDTO {
        const { idUser, name, email } = user
        return { idUser, name, email }
    }
}