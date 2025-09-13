import jwt from "jsonwebtoken"

function generateToken(payload, secret, expiresIn = "30d") {
    return jwt.sign(payload, secret, { algorithm: "HS256", expiresIn });
}


export default generateToken;