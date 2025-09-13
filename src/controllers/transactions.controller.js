import { Router } from "express";
import Order from "../models/order.model.js";
import OrderStatus from "../models/orderStatus.js";
import { generateToken } from "../utils/jwt.js";
import axios from "axios";


export const allTransactions = async (req, res) => {
    try {
        const transactions = await OrderStatus.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "collect_id",
                    foreignField: "_id",
                    as: "order_info"
                }
            },
            { $unwind: "$order_info" }
        ])

        res.status(200).json({ success: true, message: "All Transactions", transactions })
    } catch (err) {
        console.error("Get All Transactions Error:", err.message)
        res.status(500).json({ success: false, message: "Failed to fetch transactions" })
    }
}

export const tractionsBySchool = async (req, res) => {
    try {
        const { schoolId } = req.params
        if (!schoolId) {
            return res.status(400).json({ success: false, message: "School id required" })
        }
        const transactions = OrderStatus.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "collect_id",
                    foreignField: "_id",
                    as: "order_info"
                }

            },
            { $unwind: "$order_info" },
            { $match: { "order_info.school_id": schoolId } }
        ])
        res.status(200).json({success:true,message:"Transactions by School Id",transactions})
    } catch (err) {
        console.log("Transactions by school error: ",err.message)
        res.status(500).json({success:false,message:"failed to fetch transactions"})
    }
}

export const transactionStatus = async (req, res) => {
    try {
        const { collect_request_id } = req.params
        if (!collect_request_id) {
            return res.status(400).json({ success: false, message: "collect_request_id is required" })
        }

        const sign = generateToken({ school_id: process.env.SCHOOL_ID, collect_request_id }, process.env.PAYMENT_PG_KEY)

        const response = await axios.get(
            `${process.env.PAYMENT_API_URL_GET}/${collect_request_id}`, {
            params: {
                school_id: process.env.SCHOOL_ID,
                sign
            },
            headers: {
                Authorization: `Bearer ${process.env.PAYMENT_API_KEY}`,
                "Content-Type": "application/json"
            }
        })

        const { status, amount, jwt, sign: responseSign } = response.data

        await OrderStatus.findOneAndUpdate(
            { collect_id: collect_request_id },
            {
                status,
                amount,
                payment_details: response.data?.details?.payment_methods || '',
            }
        )

        res.json({
            collect_request_id,
            status,
            amount,
            details: response.data?.details?.payment_methods || '',
        });
    } catch (err) {
        console.error("Transaction Status Error:", err.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch transaction status",
            error: err.response?.data || err.message,
        });
    }
}

