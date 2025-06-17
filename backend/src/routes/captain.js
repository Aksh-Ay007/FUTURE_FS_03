const express = require("express");
const Captain = require("../models/captain");
const { captainAuth } = require("../middlewares/auth");
const bcrypt = require('bcrypt');
const { validationForSignupDataCaptain } = require("../utils/validation");

const captainRouter = express.Router();

captainRouter.post("/captain/signup", async (req, res) => {
  try {
    validationForSignupDataCaptain(req);
    const { firstName, lastName, email, password } = req.body;
    const { color, plateNumber, capacity, vehicleType } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const captain = new Captain({
      firstName,
      lastName,
      email,
      password: passwordHash,
      vehicle: {
        color,
        plateNumber,
        capacity,
        vehicleType
      }
    });

    await captain.save();
    res.status(201).json({ message: "Captain created successfully", captain });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


captainRouter.post("/captain/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const captain = await Captain.findOne({ email: email });
    if (!captain) {
      throw new Error("Captain not found");
    }
    const isPasswordValid = await bcrypt.compare(password, captain.password);
    if (isPasswordValid) {  
      // Generate a JWT token
      const token = await captain.getJWT();
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
    res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


captainRouter.post("/captain/logout", captainAuth, async (req, res) => {
  try {
     res.cookie("token", null, {
      expires: new Date(Date.now()),
      
    });

    res.send("logout successful");
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


module.exports = captainRouter;