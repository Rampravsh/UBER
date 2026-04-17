import express from "express";
import { body } from "express-validator";
import {
  getCaptainProfile,
  loginCaptain,
  registerCaptain,
} from "../controllers/captain.controller.js";
import { authCaptain } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post(
  "/register",
  // Handle captain registration logic here
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("lastName")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate number must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehiclesType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  registerCaptain,
);

router.post(
  "/login",
  // Handle captain login logic here
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginCaptain,
);

router.get("/profile", authCaptain,getCaptainProfile);


export default router;
