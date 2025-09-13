import mongoose, { Schema } from "mongoose";

const webhookLogSchema = new Schema({
    payload: {
        type: Object, // store full raw webhook JSON
        required: true,
    },
    headers: {
        type: Object,
    },
    received_at: {
        type: Date,
        default: Date.now, 
    },
    processed: {
        type: Boolean,
        default: false, 
    },
    error: {
        type: String, 
    }
}, { timestamps: true })

const WebhookLog = mongoose.model('WebHookLog', webhookLogSchema);

export default WebhookLog;