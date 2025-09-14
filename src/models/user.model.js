import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/jwt.js";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateAuthToken = function () {

    return generateToken({ id: this._id, name: this.name }, process.env.JWT_SECRET, '5h')
}

const User = mongoose.model('User', userSchema)


export default User