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
        default: Date.now, // when the webhook hit your server
    },
    processed: {
        type: Boolean,
        default: false, // whether this webhook has been handled successfully
    },
    error: {
        type: String, // store error message if processing failed
    }
}, { timestamps: true })

const WebhookLog = mongoose.model('WebHookLog', webhookLogSchema);

export default WebhookLog;