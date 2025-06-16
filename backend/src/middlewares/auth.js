const jwt = require("jsonwebtoken");

const User = require("../models/user"); // Ensure this is the correct path to your user model

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("token not valid!");
    }

    const decodedObj = await jwt.verify(token, "uber-clone@123");

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(401)
      .json({ message: "Authentication failed", error: error.message });
  }
};

module.exports = {
  userAuth,
};
