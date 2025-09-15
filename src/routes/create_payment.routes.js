import { Router } from "express";
import { createPayment } from "../controllers/create_payment.controller.js";
import { paymentValidator } from "../validators/payment.validator.js";
import { validateRequest } from "../middelwears/validateRequest.middelwear.js";
const router = Router()

router.post("/create-payment",paymentValidator,validateRequest,createPayment)

export default router