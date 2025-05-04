import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized- no token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error in veifyToken", error);
    return res.status(500).json({success: false, message: "server error"});
  }
};
