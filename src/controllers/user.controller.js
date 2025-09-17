import User from "../models/user.model.js";

export const signup = async (req, res) => {
    try {
        // console.log(req.body)    
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are Required" })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: "Email already registered" })
        }

        let newUser = await User.create({
            name,
            email,
            password
        })

        return res
            .status(200)
            .json({
                success: true,
                message: "User registered successfully",
                user: {
                    name: newUser.name,
                    email: newUser.email
                }
            })
    } catch (err) {
        console.log("Error in signup controller", err.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and Password is required" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" })
        }

        const isPasswordValid = await user.matchPassword(password)
        if (!isPasswordValid) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" })
        }
        const token = user.generateAuthToken()

        const loggedInUser = await User.findById(user._id).select("-password")

        res
            .status(200)
            .cookie("jwt", token, {
                httpOnly: true,
                secure: true
            })
            .json({ success: true, message: "User Logged In successfully", loggedInUser })
    } catch (err) {
        console.log("Error in login controller", err.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        })
    }
}


export const logout = async (req, res) => {
    try {
        res
            .status(200)
            .clearCookie("jwt", "", { httpOnly: true, secure: true })
            .json({
                success: true,
                message: "User log out successfully",
                user: req.user
            })
    } catch (err) {
        console.log("Error in logout controller", err.message)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        })
    }
}