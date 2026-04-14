import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1000 * 60 * 60 * 24 * 7, // Automatically remove tokens after 7 days
  },
});

export const blacklistTokenModel = mongoose.model('blacklistToken', blacklistTokenSchema);