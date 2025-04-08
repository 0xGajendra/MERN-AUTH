import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Hello World!!");
});

app.use("/api/auth", authRoutes)

app.listen(port,()=>{
    connectDB();
    console.log(`Server is running in http://localhost:${port}`);
})
