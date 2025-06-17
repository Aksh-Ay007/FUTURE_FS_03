const express=require('express')
const { validateSignupData } = require("../utils/validation"); // Uncomment if you want to use validation utility
const User = require("../models/user"); // Ensure this is the correct path to your user model
const { userAuth } = require("../middlewares/auth");
const bcrypt = require("bcrypt"); // Use bcryptjs for hashing passwords
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token handling


const authRouter=express.Router()


authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    // Check for Mongoose validation errors
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: error.message, errors: error.errors });
    }
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await user.validatePassword(password); // Assuming validatePassword is a method in your User model that checks the password

    if (isPasswordValid) {
      // Generate a JWT token
      const token = await user.getJWT(); // Assuming getJwt is a method in your User model that generates a JWT token
      // Log the token to the console
      console.log("Token generated:", token);
      // Set token as httpOnly cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // 8 hours
        httpOnly: true,
      });
      res.send("login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports=authRouter