import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";


export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            error: err.message,
            code: err.errorCode
        })
    }
    if (err instanceof PrismaClientKnownRequestError) {
        return res.status(500).json({
            error: "Error while trying to create resource!",
            code: "P_ERROR"
        })
    }

    console.log("Unexpected error. " + err)
    return res.status(500).json({ error: "Server error.", code: (err as string).toString() })
}