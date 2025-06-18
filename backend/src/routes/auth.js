const express = require("express");
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const bcrypt = require('bcrypt');

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignupData(req);
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });

        await user.save();

        // Generate a token for the new user (if you have getJWT method)
        // const token = await user.getJWT();
        // res.cookie('token', token, { expires: new Date(Date.now() + 900000) });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: user
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Error saving the user: ' + err.message
        });
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();
            
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
                httpOnly: true,
            });

            res.status(200).json({
                success: true,
                message: "Login successful",
                data: user
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

authRouter.post("/logout", userAuth, async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
        });

        res.json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

module.exports = authRouter;