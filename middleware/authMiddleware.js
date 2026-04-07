import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    //if the token does not exist, then return the error response
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res
        .status(404)
        .json({ success: false, message: "No user found with this id" });
    }
    //this will call the next middleware or the controller function that is protected by this middleware
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};

export { protect };