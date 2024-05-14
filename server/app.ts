import express from "express";
import { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Router } from "express";
import { User } from "./models/users";
import bcrypt from "bcryptjs";

const PORT: number = 8000;

const app: Application = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Welcome To JWT Authentication </h1>");
});
app.listen(PORT, async () => {
  console.log(`🗄️ Server Fire on http:localhost//${PORT}`);
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("🛢️ Connected To Database");
  } catch (error) {
    console.log("⚠️ Error to connect Database");
  }
});

app.post("/auth/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const isEmailAlreadyExist = await User.findOne({ email });

    if (isEmailAlreadyExist) {
      return res.status(400).json({
        status: 400,
        message: "Email already in use",
      });
    }

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword, // Store hashed password
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "User created Successfully",
      user: newUser,
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Incorrect password",
      });
    }

    const jwt = require("jsonwebtoken");
    const JWT_SECRET_KEY = process.env.JWT_SECRET || console.log("ERROR");
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Login successful",
      token: token,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

app.get("/:id", async (req, res) => {
  try {
    // Fetch current user from the database as JSON
    const users = await User.findById(req.params.id);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

app.get("/auth", async (req, res) => {
  try {
    const { email } = req.body;
    // Fetch current user from the database as JSON
    const user = await User.findOne({ email }); // Use findOne instead of findById
    return res.status(200).json(user); // Changed 'users' to 'user' since it's a single user
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// Update (Put) method for updating user info in mongoDB
app.put("/:id", async (req, res) => {
  try {
    // Extract data from request body
    const {
      username,
      password,
      pomodoro,
      shortBreak,
      longBreak,
      timeSpent,
      friends,
    } = req.body;

    // Find the user by ID

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: `User ${req.params.id} not found` });
    }

    let hashedPassword;
    //Generate hashed password for updated password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // Update user properties
    user.username = username ?? user.username; // Only update if it is provided
    user.password = hashedPassword ?? user.password;
    user.pomodoro = pomodoro ?? user.pomodoro;
    user.shortBreak = shortBreak ?? user.shortBreak;
    user.longBreak = longBreak ?? user.longBreak;
    user.timeSpent = timeSpent ?? user.timeSpent;
    user.friends = friends ?? user.friends;

    // Save the updated user
    const updatedUser = await user.save();
    return res.status(200).json(updatedUser);
  } catch (err: any) {
    const errorMessage = err instanceof Error ? err.message : err.toString();
    return res.status(400).send(errorMessage);
  }
});

// Delete operation, for removing user from mongoDB
app.delete("/:id", async (req, res) => {
  try {
    // Find the user by ID and delete it
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: `User not found` });
    }
    return res.status(200).json({
      message: `User deleted successfully`,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err });
  }
}); // End Delete Route
