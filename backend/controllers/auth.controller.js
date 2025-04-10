import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import crypto from "crypto"
import { sendPasswordResetEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
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

        sendVerificationEmail(user.email, verificationToken);

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

export const verifyEmail = async (req, res) => {
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now()}
        })
        console.log(user);
        

        if(!user){
            res.status(400).json({
                success: false,
                message: "Invalid or Expired varification code "
            })
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user:{
                ...user._doc,
                password: undefined,
            }
        })

    } catch (error) {
        console.log(error.message);
        
        return res.status(400).json({
            success: false,
            message: "Error while verifying"
        })
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        console.log(user);
        
        if(!user)
        {
            return res.status(400).json({ success: false, message: "Invalid credentials"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password); 

        if(!isPasswordValid){
            return res.status(400).json({ success: false, message: "Invalid credentials"});
        }

        generateTokenAndSetCookie(res, user._id);
        user.lastDate = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in succesfully",
            user: {
                ...user._doc,
                password
                : undefined,
            },
        })
    }
    catch(error){
        console.log("Error in Login", error)
        res.status(400).json({ success: false, message: error.message})
    }

}


export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully"});
}

export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ success: false, message: "User not found"});
        }

        //Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpireAt = Date.now() + 1*60*60*1000; //1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpireAt;

        await user.save();

        //send email
        await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({ success: true, message: "Password reset link sent to your email"});

        
    } catch (error) {
        console.log("Error in forgotPassword", error);
        res.status(400).json({success: false, message: error.message});
        
    }
}