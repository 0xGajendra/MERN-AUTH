import jwt from "jsonwebtoken"
export const generateTokenAndSetCookie = (res, userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: "7d",
    })

    res.cookie("token", token, {
        httpOnly: true,//cookie can not be accessable from client side JS
        secure: process.env.NODE_ENV === "production", //if it is in development it will be HTTP else if it will be HTTPS
        sameSite: "strict", //prevents csrf attack at backend
        maxAge: 7*24*60*60*1000,
    });

    return token;
}