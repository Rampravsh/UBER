import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = Schema({
  fullName: {
    firstName: {
      type: String,
      require: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastName: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    require: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters long"],
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashedPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

export const userModel = model("user", userSchema);
