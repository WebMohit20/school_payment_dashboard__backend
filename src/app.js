import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import paymentRoute from "./routes/create_payment.routes.js"
import transactionRoute from "./routes/transactions.route.js"
import webhookRoute from "./routes/webhook.route.js"
import userRoute from "./routes/user.route.js"
import { checkAuth } from "./middelwears/auth.middelwear.js"
const app = express()


app.use(express.json())

const allowedOrigins = [
    "http://localhost:5173",
    "https://school-payment-dashboard-chi.vercel.app"
]

app.use(
    cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); 
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true 
  })
)

app.use(cookieParser())

app.use("/api/v1",userRoute)

app.use("/api/v1",webhookRoute)

app.use("/api/v1",checkAuth,paymentRoute)

app.use("/api/v1",checkAuth,transactionRoute)

export default app