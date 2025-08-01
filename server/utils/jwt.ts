import jwt from "jsonwebtoken"

export interface UserCache {
    idUser: number
    email: string
}

export class JWTClass {
    private jwt_token: string

    constructor(
        jwt_token: string) {
        this.jwt_token = jwt_token
    }

    public generateJWT(payload: Object | string): string {
        return jwt.sign(payload, this.jwt_token, {
            expiresIn: 36000
        })
    }

    public verifyJWT(token: string): { email: string } | null {
        try {
            return jwt.verify(token, this.jwt_token) as { email: string }
        } catch {
            return null
        }
    }
}

