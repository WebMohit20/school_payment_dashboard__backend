import { Router } from "express";
import {
    tractionsBySchool,
    allTransactions,
    transactionStatus
} from "../controllers/transactions.controller.js";
import {
    transactionsValidator,
    transactionStatusValidator,
    tractionsBySchoolValidator
} from "../validators/transaction.validator.js";

import { validateRequest } from "../middelwears/validateRequest.middelwear.js";

const router = Router()

router.get("/transactions", transactionsValidator, validateRequest, allTransactions)

router.get("/transactions/school/:schoolId", tractionsBySchoolValidator, validateRequest, tractionsBySchool)

router.get("/transaction-status/:collect_request_id", transactionStatusValidator, validateRequest, transactionStatus)

export default router