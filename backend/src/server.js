import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGODB_URI).then((res) => {
  console.log("Connected to MongoDB" + res.Connection.host);
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})