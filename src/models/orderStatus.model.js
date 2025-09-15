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
    },
    payment_mode: {
        type: String,
        trim: true
    },
    payment_details: {
        type: String,
        trim: true
    },
    bank_refrence: {
        type: String,
    },
    payment_message: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        required: true,
        default: "PENDING",
    },
    error_message: {
        type: String,
        trim: true
    },
    payment_time: {
        type: Date,
        default: Date.now
    }

},
    { timestamps: true }
)

orderStatusSchema.index({ collect_id: 1 }); 
orderStatusSchema.index({ status: 1 }); 
orderStatusSchema.index({ payment_time: -1 });
const OrderStatus = mongoose.model('OrderStatus', orderStatusSchema)

export default OrderStatus