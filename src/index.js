import connectDB from "./db/db.js"
import dotenv from "dotenv";
import app from "./app.js";
import path from "path"
dotenv.config();
// import { insertOrders,insertOrderStatuses } from "./utils/seeds.js";
const __dirname = path.resolve();

connectDB()
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(process.env.PORT, () => {
    console.log('app is running on ', process.env.PORT);
})