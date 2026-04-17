import { captainModel } from "../models/captain.model.js";

export const createCaptain = async ({
  email,
  password,
  firstName,
  lastName,
  vehicle,
}) => {
  if (!email || !password || !firstName || !lastName || !vehicle) {
    throw new Error("All fields are required");
  }
  const captain = await captainModel.create({
    email,
    password,
    fullName: {
      firstName,
      lastName,
    },
    vehicles: vehicle,
  });
  return captain;
};
