import axios from "axios"
import generateToken from "../utils/jwt.js"
import Order from "../models/order.model.js"
import OrderStatus from "../models/orderStatus.model.js"

export const createPayment = async (req, res) => {
    try {
        const { school_id, trustee_id, student_info, gateway_name, amount, callback_url } = req.body

        if (!school_id || !amount || !callback_url) {
            return res.status(400).json({ sucess: false, message: "school_id,amount,callback_url are required" })
        }

        const sign = generateToken({ school_id, amount, callback_url }, process.env.PAYMENT_PG_KEY)
        console.log("sign", sign)

        const response = await axios.post(
            process.env.PAYMENT_API_URL_POST,
            {
                school_id,
                amount,
                callback_url,
                sign
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYMENT_API_KEY}`,
                    "Content-Type": "application/json"
                },
            }
        )
        const { collect_request_id, Collect_request_url } = response.data;
        const order = await Order.create({
            school_id,
            trustee_id,
            student_info,
            gateway_name
        })

        await OrderStatus.create({
            collect_id: order._id,
            order_amount: amount,
            status: "pending",
            payment_details: collect_request_id
        })

        res.status(200).json({
            message: "payment link created successfully",
            collect_request_id,
            payment_link: Collect_request_url
        })
    } catch (error) {

    }
}