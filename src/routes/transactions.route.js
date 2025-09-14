import { Router } from "express";
import { tractionsBySchool,allTransactions,transactionStatus } from "../controllers/transactions.controller.js";
import { checkAuth } from "../middelwears/auth.middelwear.js";


const router = Router()

router.get("/transactions",checkAuth, allTransactions)

router.get("/transactions/school/:schoolId",checkAuth, tractionsBySchool)

router.get("/transaction-status/:collect_request_id",checkAuth, transactionStatus)

export default router