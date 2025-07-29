import express, { Request, Response } from "express"
import { UserService } from "../services/UserService"
import { UserRepository } from "../repositories/UserRepository"
import { validateLogin, validateUser } from "../../utils/validateUser"
import { CustomError, InvalidRequest } from "../errors/HttpError"

const router = express.Router()
const service = new UserService(new UserRepository())

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
        return new InvalidRequest("Invalid login.", 400, "INVALID_LOGIN", validLogin.error.issues.map(err => ({
            fields: err.path.join('.'),
            message: err.message
        })))
    }
    const login = await service.loginUser(email, password)

    if (login) {
        return res.status(200).json({
            message: "User logged in successfully.",
            token: "TOKEN"
        })
    }
    throw new CustomError("Incorrect email or password.", 401, "INCORRECT_LOGIN")
})

export default router