import { body } from "express-validator"

export const paymentValidator = [

    body("amount")
        .exists()
        .withMessage("amount is required")
        .isNumeric()
        .withMessage("amount must be a number"),

    body("callback_url")
        .exists()
        .withMessage("callback_url is required")
        .isURL()
        .withMessage("callback_url must be a valid URL"),
]
