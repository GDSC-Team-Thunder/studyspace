import express from "express";
import { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response, Router } from "express";
import { User } from "./models/users";
import jwt from "jsonwebtoken";
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

// Define the router for CRUD request
const router: Router = Router();

app.post("/auth/register", async (req, res) => {
  try {
    const user = req.body;
    const { name, email, password } = user;

    // Generate hashed password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const isEmailAllReadyExist = await User.findOne({
      email: email,
    });

    // ** Add a condition if the user exist we will send the response as email all ready exist
    if (isEmailAllReadyExist) {
      res.status(400).json({
        status: 400,
        message: "Email already in use",
      });
      return;
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });
    // Send the newUser as response;
    res.status(200).json({
      status: 201,
      success: true,
      message: " User created Successfully",
      user: newUser,
    });
  } catch (error: any) {
    // console the error to debug
    console.log(error);
    // Send the error message to the client
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

const JWT_SECRET_KEY = process.env.JWT_SECRET;

app.post("/auth/login", async (req, res) => {
  try {
    // ** Get The User Data From Body ;
    const user = req.body;
    // ** destructure the information from user;
    const { email, password } = user;
    // ** Check the (email/user) exist in database or not ;
    const isUserExist = await User.findOne({
      email: email,
    });
    // ** if there is not any user we will send user not found;
    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
      return;
    }
    // ** if the (user) exist in database we will check the password is valid or not ;
    // ** compare the password in db and the password sended in the request body
    const isPasswordMatched = isUserExist?.password === password;
    // ** if not matched send response that wrong password;
    if (!isPasswordMatched) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "wrong password",
      });
      return;
    }
    const token = jwt.sign(
      { _id: isUserExist?._id, email: isUserExist?.email },
      JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    // send the response
    res.status(200).json({
      status: 200,
      success: true,
      message: "login success",
      token: token,
    });
  } catch (error: any) {
    // Send the error message to the client
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});
