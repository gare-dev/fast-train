export class HttpError extends Error {
    statusCode: number
    errorCode: string

    constructor(message: string, statusCode: number, errorCode: string) {
        super(message)
        this.name = "HttpError"
        this.statusCode = statusCode
        this.errorCode = errorCode
    }
}

export class CustomError extends HttpError {
    constructor(message: string, statusCode: number, errorCode: string) {
        super(message, statusCode, errorCode)
    }
}

export class InvalidRequest extends HttpError {
    errors: {
        fields: string
        message: string
    }[]
    constructor(message: string, statusCode: number, errorCode: string, errors: {
        fields: string
        message: string
    }[]) {
        super(message, statusCode, errorCode)
        this.errors = errors
    }
}