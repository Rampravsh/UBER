import { validationResult } from "express-validator";
import { captainModel } from "../models/captain.model.js";
import { createCaptain } from "../services/captain.sevice.js";
import { blacklistTokenModel } from "../models/blacklistToken.model.js";

export const registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password, firstName, lastName, vehicle } = req.body;
  const hashPassword = await captainModel.hashedPassword(password);
  const captain = await createCaptain({
    email,
    password: hashPassword,
    firstName,
    lastName,
    vehicle,
  });
  const token = captain.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(201).json({ message: "Captain registered successfully", token });
};

export const loginCaptain = async (req, res) => {
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = captain.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Captain logged in successfully", token });
};

export const getCaptainProfile = async (req, res) => {
  res.status(200).json({ captain: req.captain });
};

export const logoutCaptain = async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: "Captain logged out successfully" });
};
