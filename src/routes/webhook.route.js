import { Router } from "express";
import {webhookHandler} from "../controllers/webhook.controller.js"

const router = Router()

router.post("/webhook",webhookHandler)

export default router