import { Router } from "express";
import { signup,login,logout } from "../controllers/user.controller.js";
import { checkAuth } from "../middelwears/auth.middelwear.js";
import { signupValidator,loginValidator } from "../validators/user.validator.js";
import { validateRequest } from "../middelwears/validateRequest.middelwear.js";

const router = Router()

router.post("/signup",signupValidator,validateRequest, signup)
router.post("/login",loginValidator,validateRequest,login)
router.delete("/logout",checkAuth,logout)

export default router