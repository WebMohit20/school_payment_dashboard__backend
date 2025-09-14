import connectDB from "./db/db.js"
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
// import { insertOrders,insertOrderStatuses } from "./utils/seeds.js";


connectDB()


app.listen(process.env.PORT, () => {
    console.log('app is running on ', process.env.PORT);
    
})