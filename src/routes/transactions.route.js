import { Router } from "express";
import { tractionsBySchool,allTransactions,transactionStatus } from "../controllers/transactions.controller.js";
import { verifyToken } from "../utils/jwt.js";

const router = Router()

router.get("/transactions",allTransactions)

router.get("/transactions/school/:schoolId",tractionsBySchool)

router.get("/transaction-status/:collect_request_id",transactionStatus)

export default router