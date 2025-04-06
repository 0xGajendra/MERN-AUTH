import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv"
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;



app.listen(port,()=>{
    connectDB();
    console.log(`Server is running in http://localhost:${port}`);
})
