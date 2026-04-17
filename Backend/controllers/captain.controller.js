import { validationResult } from "express-validator";
import { captainModel } from "../models/captain.model.js";
import { createCaptain } from "../services/captain.sevice.js";

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
