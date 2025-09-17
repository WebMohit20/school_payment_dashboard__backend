import mongoose from "mongoose"
import Order from "../models/order.model.js"
import OrderStatus from "../models/orderStatus.model.js"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/School`)
        

        console.log(conn.connection.host)
        
        await Order.init();
        await OrderStatus.init();
    } catch (err) {
        console.error('connection error ', err.message)
        process.exit(1)
    }
}

export default connectDB