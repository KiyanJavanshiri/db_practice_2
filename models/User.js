import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "this field is required"],
      trim: true,
      minLength: [3, "user name is too short"],
      maxLength: [30, "user name is too long"],
    },
    last_name: {
      type: String,
      required: [true, "this field is required"],
      trim: true,
      minLength: [3, "user last name is too short"],
      maxLength: [30, "user last name is too long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const User = mongoose.model("User", userSchema);
