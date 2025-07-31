import express, { Request, Response } from "express"
import { UserService } from "../services/UserService"
import { UserRepository } from "../repositories/UserRepository"
import { validateLogin, validateUser } from "../../utils/validateUser"
import { InvalidRequest } from "../errors/HttpError"
import { JWTClass } from "../../utils/jwt"
import { Redis } from "../../utils/redis"

const router = express.Router()
const service = new UserService(new UserRepository(), new JWTClass(process.env.JWT_TOKEN!), new Redis())

router.post("/user", async (req: Request, res: Response) => {
    const { email, name, password } = req.body

    const validUser = validateUser({ email, name, password })

    if (validUser.error) {
        return res.status(400).json({
            message: "Invalid user.",
            code: "INVALID_USER",
            errors: validUser.error.issues.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }))
        })
    }

    const newUser = await service.createUser({ email, name, password })

    return res.status(201).json({
        message: "User created successfully.",
        code: "USER_CREATED",
        data: newUser,
    })
})

router.post('/auth/login', async (req: Request, res: Response) => {
    const { email, password } = req.body
    const validLogin = validateLogin({ email, password })

    if (validLogin.error) {
        throw new InvalidRequest("Invalid login.", 400, "INVALID_LOGIN", validLogin.error.issues.map(err => ({
            fields: err.path.join('.'),
            message: err.message
        })))
    }
    const token = await service.loginUser(email, password)

    return res.
        cookie('token', token, {
            httpOnly: true,
            sameSite: "strict",
            path: "/",
            secure: true
        }).status(200).json({
            message: "User logged in successfully.",
            code: "USER_LOGGED"
        })

})

export default router