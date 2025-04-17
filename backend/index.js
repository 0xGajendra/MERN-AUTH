import express from "express";
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res)=>{
    res.send("Hello World!!");
});

app.use("/api/auth", authRoutes)

app.listen(port,()=>{
    connectDB();
    console.log(`Server is running in http://localhost:${port}`);
})
