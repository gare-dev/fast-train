import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/HttpError";
import { JWTClass } from "../../utils/jwt";
import { Redis } from "../../utils/redis";


export function unauthenticatedMiddleware(jwt: JWTClass, redis: Redis) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.token
            if (!token) return next(new CustomError("Unauthenticated.", 401, "UNAUTHENTICATED"))

            const decoded = jwt.verifyJWT(token)
            if (!decoded?.email) return next(new CustomError("Unauthenticated.", 401, "UNAUTHENTICATED"))

            const user = await redis.getRedis(decoded.email)
            if (!user) return next(new CustomError("Unauthenticated.", 401, "UNAUTHENTICATED"))

            next()
        } catch (err) {
            next(err)
        }
    }
}
