import { body } from "express-validator"

export const signupValidator = [
    body("name")
        .exists()
        .withMessage("All fields are required"),
        

    body("email")
        .exists()
        .withMessage("All fields are required"),
        

    body("password")
        .exists()
        .withMessage("All fields are required")
        
]

export const loginValidator = [
    body("email")
        .exists()
        .withMessage("All fields are required"),

    body("password")
        .exists()
        .withMessage("All fields are required")
]