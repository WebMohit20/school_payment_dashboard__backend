import OrderStatus from "../models/orderStatus.model.js";
import { generateToken } from "../utils/jwt.js";
import axios from "axios";


export const allTransactions = async (req, res) => {
    try {
        let { page = 1, limit = 10, sort = "payment_time", order = "asc" } = req.query
        page = parseInt(page)
        limit = parseInt(limit)
        const skip = (page - 1) * limit

        const sortOrder = order === "asc" ? 1 : -1
        if (!["payment_time", "status", "transaction_amount"].includes(sort)) {
            sort = "payment_time"
        }
        const transactions = await OrderStatus.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "collect_id",
                    foreignField: "_id",
                    as: "order_info"
                }
            },
            { $unwind: "$order_info" },
            {
                $project: {
                    collect_id: 1,
                    order_amount: 1,
                    status: 1,
                    transaction_amount: 1,
                    payment_time: 1,
                    "order_info.school_id": 1,
                    "order_info.gateway_name": 1,
                    _id: 0
                }
            },
            { $skip: skip },
            { $limit: limit },
            { $sort: { [sort]: sortOrder } }
        ])




        res.status(200).json({
            success: true,
            message: "All Transactions",
            page,
            limit,
            dataCount: transactions.length,
            data: transactions
        })
    } catch (err) {
        console.error("Get All Transactions Error:", err.message)
        res.status(500).json({
            success: false,
            message: "Failed to fetch transactions",
            error: err.message
        })
    }
}

export const tractionsBySchool = async (req, res) => {
    try {
        const { schoolId } = req.params
        let { page = 1, limit = 10, sort = "payment_time", order = "asc" } = req.query
        page = parseInt(page)
        limit = parseInt(limit)
        const skip = (page - 1) * limit

        const sortOrder = order === "asc" ? 1 : -1
        if (!["payment_time", "status", "transaction_amount"].includes(sort)) {
            sort = "payment_time"
        }
        // console.log(schoolId)
        if (!schoolId) {
            return res.status(400).json({ success: false, message: "School id required" })
        }
        const transactions = await OrderStatus.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "collect_id",
                    foreignField: "_id",
                    as: "order_info"
                }
            },
            { $unwind: "$order_info" },
            { $match: { "order_info.school_id": schoolId } },
            {
                $project: {
                    collect_id: 1,
                    order_amount: 1,
                    status: 1,
                    transaction_amount: 1,
                    payment_time: 1,
                    "order_info.school_id": 1,
                    "order_info.gateway_name": 1,
                    _id: 0
                }
            },
            { $skip: skip },
            { $limit: limit },
            { $sort: { [sort]: sortOrder } }
        ])

        // console.log(transactions)
        res.status(200).json({
            success: true,
            message: "Transactions by School Id",
            dataCount: transactions.length,
            data: transactions
        })
    } catch (err) {
        console.log("Transactions by school error: ", err.message)
        res.status(500).json({
            success: false,
            message: "failed to fetch transactions",
            error: err.message
        })
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

        res.status(200).json({
            success: true,
            collect_request_id,
            status,
            amount,
            details: response.data?.details?.payment_methods || '',
        });
    } catch (err) {
        console.error("Transaction Status Error:", err.message)
        res.status(500).json({
            success: false,
            message: "Failed to fetch transaction status",
            error: err.message,
        })
    }
}

