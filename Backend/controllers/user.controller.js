import { validationResult } from "express-validator";
import { userModel } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";

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
    .json({ token, user, message: "User registered successfully" });
};
