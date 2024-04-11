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
    const user = req.body;
    const { email, password } = user;

    const isUserExist = await User.findOne({
      email: email,
    });

    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
      return;
    }

    const isPasswordMatched = isUserExist?.password === password;

    if (!isPasswordMatched) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "wrong password",
      });
      return;
    }

    const jwt = require("jsonwebtoken");
    const JWT_SECRET_KEY = process.env.JWT_SECRET || console.log("ERROR");
    const token = jwt.sign(
      { _id: isUserExist?._id, email: isUserExist?.email },
      JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "login success",
      token: token,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});
