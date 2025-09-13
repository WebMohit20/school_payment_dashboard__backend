import express from "express"
import cors from "cors"
import paymentRoute from "./routes/create_payment.routes.js"
import transactionRoute from "./routes/transactions.route.js"
const app = express()


app.use(express.json())

app.use("/api/v1",paymentRoute)
app.use("/api/v1",transactionRoute)


export default app