import { Router } from "express";
import { createPayment } from "../controllers/create_payment.controller.js";
import { verifyToken } from "../utils/jwt.js";
const router = Router()

router.post("/create-payment",createPayment)
// have to add middelwear


export default router