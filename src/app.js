import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import paymentRoute from "./routes/create_payment.routes.js"
import transactionRoute from "./routes/transactions.route.js"
import webhookRoute from "./routes/webhook.route.js"
import userRoute from "./routes/user.route.js"
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use("/api/v1",paymentRoute)
app.use("/api/v1",transactionRoute)
app.use("/api/v1",webhookRoute)
app.use("/api/v1",userRoute)

export default app