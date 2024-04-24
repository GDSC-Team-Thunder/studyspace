import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  pomodoro: {
    type: Number,
    default: 1500,
  },
  shortBreak: {
    type: Number,
    default: 300,
  },
  longBreak: {
    type: Number,
    default: 900,
  },
  timeSpent: {
    type: Number,
    default: 1,
  },
  friends: {
    type: Array<String>,
    default: {},
  },
});

export const User = mongoose.model("Users", userSchema);
