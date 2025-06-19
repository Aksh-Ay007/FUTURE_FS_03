const express = require("express");
const Captain = require("../models/captain");
const { captainAuth } = require("../middlewares/auth");
const bcrypt = require('bcrypt');
const { validationForSignupDataCaptain } = require("../utils/validation");

const captainRouter = express.Router();

captainRouter.post("/captain/signup", async (req, res) => {
  try {
    // Validate the request
    validationForSignupDataCaptain(req);
    
    const { firstName, lastName, email, password } = req.body;
    const { color, plateNumber, capacity, vehicleType } = req.body.vehicle;

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create new captain
    const captain = new Captain({
      firstName,
      lastName,
      email,
      password: passwordHash,
      vehicle: {
        color,
        plateNumber,
        capacity: parseInt(capacity), // Ensure it's a number
        vehicleType
      }
    });

    // Save to database
    await captain.save();
    
    // Generate token
    const token = await captain.getJWT();
    
    // Set cookie
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours
      httpOnly: true,
    });
    
    res.status(201).json({ 
      message: "Captain created successfully", 
      data: {
        _id: captain._id,
        firstName: captain.firstName,
        lastName: captain.lastName,
        email: captain.email,
        vehicle: captain.vehicle
      }
    });
  } catch (error) {
    console.error("Captain signup error:", error);
    
    // Handle specific error types
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: validationErrors 
      });
    }
    
    if (error.code === 11000) {
      // Duplicate key error
      let field = 'email';
      if (error.keyPattern && error.keyPattern['vehicle.plateNumber']) {
        field = 'plate number';
      }
      return res.status(400).json({ 
        message: `Captain with this ${field} already exists` 
      });
    }
    
    res.status(400).json({ 
      message: error.message || "Internal server error"
    });
  }
});

captainRouter.post("/captain/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const captain = await Captain.findOne({ email: email });
    if (!captain) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const isPasswordValid = await bcrypt.compare(password, captain.password);
    if (isPasswordValid) {
      const token = await captain.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // 8 hours
        httpOnly: true,
      });
      
      // Return captain data like user login does
      res.json({ 
        message: "Login successful",
        data: {
          _id: captain._id,
          firstName: captain.firstName,
          lastName: captain.lastName,
          email: captain.email,
          vehicle: captain.vehicle
        }
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Captain login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

captainRouter.post("/captain/logout", captainAuth, async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = captainRouter;