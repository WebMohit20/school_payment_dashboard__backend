import jwt from "jsonwebtoken"

function generateToken(payload, secret) {
    return jwt.sign(payload, secret, { algorithm: "HS256" });
}


export default generateToken;