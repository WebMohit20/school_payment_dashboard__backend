import axios from "axios"
import { generateToken } from "../utils/jwt.js"
import Order from "../models/order.model.js"
import OrderStatus from "../models/orderStatus.model.js"

export const createPayment = async (req, res) => {
    try {
        const { school_id, trustee_id, student_info, amount, callback_url, gateway_name } = req.body

        if (!amount || !callback_url) {
            return res.status(400).json({ success: false, message: "school_id,amount,callback_url are required" })
        }

        const jwtSign = generateToken({ school_id:process.env.SCHOOL_ID, amount, callback_url }, process.env.PAYMENT_PG_KEY)
        

        const response = await axios.post(
            process.env.PAYMENT_API_URL_POST,
            {
                school_id: process.env.SCHOOL_ID,
                amount,
                callback_url,
                sign: jwtSign
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYMENT_API_KEY}`,
                    "Content-Type": "application/json"
                },
            }
        )
        const { collect_request_id, collect_request_url, sign } = response.data;

        

        
        const order = await Order.create({
            _id:collect_request_id,
            school_id,
            trustee_id,
            student_info,
            gateway_name
        })

        await OrderStatus.create({
            collect_id: collect_request_id,
            order_amount: amount,
            status: "pending",
            transaction_amount:amount,

        })

        return res.status(200).json({
            success: true,
            message: "payment link created successfully",
            collect_request_id,
            collect_request_url
        })
    } catch (err) {
        console.log("Create payment error", err.message)
        res.status(500).json({
            success: false,
            message: "Failed to create payment",
            error: err.message
        })
    }
}