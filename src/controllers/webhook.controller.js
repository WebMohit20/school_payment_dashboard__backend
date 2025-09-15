import OrderStatus from "../models/orderStatus.model.js";
import WebhookLog from "../models/webhookLog.model.js"

export const webhookHandler = async (req, res) => {
    try {
        // console.log(req.body)
        const payload = req.body
        await WebhookLog.create({ payload })
        const { order_id, order_amount, transaction_amount, payment_mode, payment_details, bank_refrence, payment_message, status, error_message, payment_time } = payload.order_info

        if(!order_id){
            return res.status(400).json({success:false,message:"Order id is missing"})
        }

        await OrderStatus.findOneAndUpdate(
            { collect_id: order_id },
            {
                order_amount,
                transaction_amount,
                payment_mode,
                payment_details,
                bank_refrence,
                payment_message,
                status,
                error_message,
                payment_time
            },
            { new: true }
        )

        res.status(200).json({ success: true, message: "Webhook processed successfully" })

    } catch (err) {
        console.log("Webhook processing error: ", err.message)
        res.status(500).json({
            success: false,
            message: "Failed to process webhook",
            error: err.message
        })
    }
}