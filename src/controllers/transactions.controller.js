import Order from "../models/order.model.js";
import OrderStatus from "../models/orderStatus.model.js";
import { generateToken } from "../utils/jwt.js";
import axios from "axios";


export const allTransactions = async (req, res) => {
    try {
        let { page = 1, limit = 10, sort = "payment_time", order = "asc", status = "" } = req.query
        page = parseInt(page)
        limit = parseInt(limit)
        const skip = (page - 1) * limit

        const sortOrder = order === "asc" ? 1 : -1
        if (!["payment_time", "status", "transaction_amount"].includes(sort)) {
            sort = "payment_time"
        }
        // const totalTransactions = await OrderStatus.countDocuments()
        status = status?.toUpperCase()
        let match = { status }
        if (!status) {
            match = {}
        }
        // console.log(match);

        const transactions = await OrderStatus.aggregate([
            { $match: match },
            {
                $facet: {
                    transactions: [
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
                                transaction_amount: 1,
                                status: 1,
                                payment_time: 1,
                                "order_info.school_id": 1,
                                "order_info.gateway_name": 1,
                                _id: 0
                            }
                        },
                        { $sort: { [sort]: sortOrder } },
                        { $skip: skip },
                        { $limit: limit },

                    ],
                    totalTransactions: [{ $count: "count" }]
                }
            },
        ])

        const totalTransactions = transactions[0].totalTransactions[0]?.count


        res.status(200).json({
            success: true,
            message: "All Transactions",
            user: req?.user.name,
            page,
            limit,
            totalTransactions,
            maxPages: Math.ceil(totalTransactions / limit) || 1,
            transactions: transactions[0].transactions
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
        let { page = 1, limit = 10, sort = "payment_time", order = "asc", status = "" } = req.query
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

        status = status?.toUpperCase()
        let match = {"order_info.school_id": schoolId, status }
        if (!status) {
            match = {"order_info.school_id": schoolId}
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
            { $match:  match  },
            
            {
                $facet: {
                    transactions: [


                        {
                            $project: {
                                collect_id: 1,
                                order_amount: 1,
                                transaction_amount: 1,
                                status: 1,
                                payment_time: 1,
                                "order_info.school_id": 1,
                                "order_info.gateway_name": 1,
                                _id: 0
                            }
                        },
                        { $skip: skip },
                        { $limit: limit },
                        { $sort: { [sort]: sortOrder } }
                    ],
                    totalTransactions: [{ $count: "count" }]
                }
            }

        ])

        const totalTransactions = transactions[0].totalTransactions[0]?.count

        res.status(200).json({
            success: true,
            message: "Transactions by School Id",
            user: req?.user.name,
            page,
            limit,
            totalTransactions,
            maxPages: Math.ceil(totalTransactions / limit) || 1,
            transactions: transactions[0].transactions
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
        // console.log(`${process.env.PAYMENT_API_URL_GET}/${collect_request_id}`);

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
        // console.log("res", response.data);

        await OrderStatus.findOneAndUpdate(
            { collect_id: collect_request_id },
            {
                status: response.data?.status,
                order_amount: response.data?.amount,
                transaction_amount: response.data?.transaction_amount,
                bank_refrence: response.data?.details?.bank_ref,
                payment_mode: response.data?.details?.payment_mode,


            }
        )

        res.status(200).json({
            success: true,
            collect_request_id,
            response: response.data
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

