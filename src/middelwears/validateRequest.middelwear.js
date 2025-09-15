import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors.errors);

        return res
            .status(400)
            .json({
                success: false,
                errors: errors?.errors?.map(err => ({
                    field: err.param,
                    message: err.msg,
                })),
            })
    }

    next()
}