import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import messageRoutes from "./routes/message.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
const port = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
mongoose.connect(process.env.MONGODB_URI).then((res) => {
  console.log("Connected to MongoDB" + res.Connection.host);
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})