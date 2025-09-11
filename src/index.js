import express from "express"
import connectDB from "./db/db.js"
import dotenv from "dotenv";
dotenv.config();
// require('dotenv').config()

const app = express()

connectDB()

app.listen(process.env.PORT,()=>{
    console.log('app is running on ',process.env.PORT);
    
})