const express = require("express");
const cors = require("cors"); // <-- Add this line

const cookieParser = require("cookie-parser"); // Import cookie-parser if you need to handle cookies

const app = express();
const connectDB = require("./config/database");
// Enable CORS for your frontend origin and allow credentials (cookies)
app.use(cors({
  origin: "http://localhost:5174",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware if you need to handle cookies


const authRouter = require("./routes/auth"); 
const profileRouter = require("./routes/profile"); // Import the profile router
const captainRouter = require("./routes/captain"); // Import the captain router

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',captainRouter); // Use the captain router



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
