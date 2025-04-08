import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
export const signup = async (req, res) => {
    const {email, name, password} = req.body;
    try {
        if(!email && !name && !password){
            throw new Error("All the fileds are required!");
        }

        const userExists = await User.find({
            email
        })
        console.log(userExists);
        

        if(userExists.length > 0){
            return res.status(400).json({success: false, message: "user already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24*60*60*1000 //Expires at 24 hours
        })

        await user.save();

        //jwt
        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            success: true,
            message: "User created succesfully",
            user:{
                ...user._doc,
                password: undefined,
            }
        })

    } catch (error) {
        res.status(400).json({success :false, error: error.message})
    }
    
}
export const login = async (req, res) => {
    res.send("login route")
}
export const logout = async (req, res) => {
    res.send("logout route")
}