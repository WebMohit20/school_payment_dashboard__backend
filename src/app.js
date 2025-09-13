import express from "express"
import cors from "cors"
import paymentRoute from "./routes/create_payment.routes.js"
import transactionRoute from "./routes/transactions.route.js"
import webhookRoute from "./routes/webhook.route.js"
const app = express()


app.use(express.json())

app.use("/api/v1",paymentRoute)
app.use("/api/v1",transactionRoute)
app.use("api/v1",webhookRoute)

export default app