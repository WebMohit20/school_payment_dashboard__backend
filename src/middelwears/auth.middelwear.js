import { verifyToken } from "../utils/jwt.js"
import User from "../models/user.model.js"

export const checkAuth = async (req, res, next) => {
    try {
        // console.log(req.hasOwnProperty("cookies"))
        const token  = req.cookies?.token

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" })
        }
        const decoded = verifyToken(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" })
        }

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user

        next()
    } catch (err) {
        console.log("Error in checkAuth middleware: ", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
