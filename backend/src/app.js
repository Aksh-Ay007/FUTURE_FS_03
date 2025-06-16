const express = require("express");

const User = require("./models/user"); // Ensure this is the correct path to your user model
const { validateSignupData } = require("./utils/validation"); // Uncomment if you want to use validation utility

const bcrypt = require("bcrypt"); // Use bcryptjs for hashing passwords

const cookieParser = require("cookie-parser"); // Import cookie-parser if you need to handle cookies
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token handling

const { userAuth } = require("./middlewares/auth");

const app = express();
const connectDB = require("./config/database");
const e = require("express");
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware if you need to handle cookies

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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
  httpOnly: true
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

app.get("/user", async (req, res) => {
  const emailId = req.body.email; // Assuming you're sending the email in the request body
  try {
    const user = await User.find({ email: emailId });
    res.send(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user; // The user object is attached to the request by the userAuth middleware

    res.send(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

app.listen(7777, () => {
  console.log("Server is running on http://localhost:7777");
});
