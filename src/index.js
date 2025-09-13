import connectDB from "./db/db.js"
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";



connectDB()



// const userData = {
//   "school_id": "65b0e6293e9f76a9694d84b4",
//   "amount": "1",           
//   "callback_url": "https://google.com", 
// }

// const sign = {
//   "school_id": "65b0e6293e9f76a9694d84b4",
//   "collect_request_id": "68c31c60154d1bce65b3de53"
// }

app.listen(process.env.PORT, () => {
    console.log('app is running on ', process.env.PORT);
    // const token = generateToken(sign, process.env.PG_KEY,1h);
    // console.log("Generated JWT:", token);


})