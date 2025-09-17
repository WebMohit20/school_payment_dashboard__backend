import { query,param } from "express-validator"

export const transactionsValidator = [

    query("limit")
        .optional()
        .toInt()
        .isInt({ min: 1 })
        .withMessage("limit must be a positive number")
        .default(10),

    query("page")
        .optional()
        .toInt()
        .isInt({ min: 1 })
        .withMessage("page must be a positive number")
        .default(1),

    query("sort")
        .optional()
        .isIn(["payment_time", "status", "transaction_amount",""])
        .withMessage("sort must be  payment_time, status or transaction_amount only")
        .default("payment_time"),

    query("order")
        .optional()
        .isIn(["asc", "desc"])
        .withMessage("order must be asc or desc")
        .default("asc")
]

export const tractionsBySchoolValidator = [
    param("schoolId")
        .exists()
        .withMessage("school id is required"),

    query("limit")
        .optional()
        .toInt()
        .isInt({ min: 1 })
        .withMessage("limit must be a positive number")
        .default(10),

    query("page")
        .optional()
        .toInt()
        .isInt({ min: 1 })
        .withMessage("page must be a positive number")
        .default(1),

    query("sort")
        .optional()
        .isIn(["payment_time", "status", "transaction_amount",""])
        .withMessage("sort must be  payment_time, status or transaction_amount only")
        .default("payment_time"),

    query("order")
        .optional()
        .isIn(["asc", "desc"])
        .withMessage("order must be asc or desc")
        .default("asc")

]

export const transactionStatusValidator = [
    param("collect_request_id")
        .exists()
        .withMessage("collect_request_id is required"),
]