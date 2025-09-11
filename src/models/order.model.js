import mongoose, { Schema } from "mongoose";

const studentInfoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        id: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
    },
);



const orderSchema = new Schema({
    school_id: {
        type: String,
        required: true,
        trim: true
    },
    trustee_id: {
        type: String,
        required: true,
        trim: true
    },
    student_info: {
        type: studentInfoSchema,
        required: true,
    },
    gateway_name: {
        type: String,
        required: true,
        trim: true,
    },
},
{ timestamps: true })


const Order = mongoose.model('Order',orderSchema)

export default Order