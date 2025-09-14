import { Router } from "express";
import { signup,login,logout } from "../controllers/user.controller.js";
import { checkAuth } from "../middelwears/auth.middelwear.js";


const router = Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)

export default router