import jwt from "jsonwebtoken"

export function generateToken(payload, secret, expiresIn = "30d") {
    return jwt.sign(payload, secret, { algorithm: "HS256", expiresIn });
}

export function verifyToken(token,secret){
    return jwt.verify(token,secret)
}

