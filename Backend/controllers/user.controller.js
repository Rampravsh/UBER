import { validationResult } from "express-validator";
import { userModel } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { blacklistTokenModel } from "../models/blacklistToken.model.js";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await userModel.hashedPassword(password);
  const user = await createUser({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  console.log(user);
  const token = user.generateAuthToken();
  res
    .status(201)
    .cookie("token", token)
    .json({ token, user, message: "User registered successfully" });
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = user.generateAuthToken();
  res
    .status(200)
    .cookie("token", token)
    .json({ token, user, message: "User logged in successfully" });
};

export const getUserProfile = async (req, res) => {
  res.status(200).json({ user: req.user });
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: "User logged out successfully" });
};
