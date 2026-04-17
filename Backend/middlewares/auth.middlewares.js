import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { blacklistTokenModel } from "../models/blacklistToken.model.js";
import { captainModel } from "../models/captain.model.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const blacklistedToken = await blacklistTokenModel.findOne({ token });
  if (blacklistedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded._id);
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authCaptain = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const blacklistedToken = await blacklistTokenModel.findOne({ token });
  if (blacklistedToken) {
    return res.status(401).json({ message: "blackListed token " });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: "Captain not found" });
    }
    req.captain = captain;

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
