import mongoose, { Schema } from "mongoose";

const orderStatusSchema = new Schema({
    collect_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    order_amount: {
        type: Number,
        required: true
    },
    transaction_amount: {
        type: Number,
        required: true
    },
    payment_mode: {
        type: String,
        required: true,
        trim: true
    },
    payment_details: {
        type: String,
        trim: true
    },
    bank_refrence: {
        type: String,
        required: true
    },
    payment_message: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "success", "failed"],
        default: "pending",
    },
    error_message: {
        type: String,
        trim: true
    },
    payment_time:{
        type:Date,
        required: true,
        default: Date.now
    }

},
{timestamps: true})

const OrderStatus = mongoose.model('OrderStatus',orderStatusSchema)

export default OrderStatus