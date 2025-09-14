import { Router } from "express";
import { createPayment } from "../controllers/create_payment.controller.js";
import { checkAuth } from "../middelwears/auth.middelwear.js";
const router = Router()

router.post("/create-payment",checkAuth,createPayment)
// have to add middelwear


export default router