import jwt from "jsonwebtoken"

export class JWTClass {
    jwt_token: string

    constructor(jwt_token: string) {
        this.jwt_token = jwt_token
    }

    public generateJWT(payload: Object | string): string {
        return jwt.sign(payload, this.jwt_token, {
            expiresIn: 36000
        })
    }
}

