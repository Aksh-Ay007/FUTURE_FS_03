const express = require("express");
const cors = require("cors"); // <-- Add this line

const cookieParser = require("cookie-parser"); // Import cookie-parser if you need to handle cookies

const app = express();
const connectDB = require("./config/database");
// Configure CORS properly for credentialed requests
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true // Allow credentials (cookies, authorization headers)
}));

app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware if you need to handle cookies


const authRouter = require("./routes/auth"); 
const profileRouter = require("./routes/profile"); // Import the profile router
const captainRouter = require("./routes/captain"); // Import the captain router
const captainProfileRouter=require('./routes/captainProfile')

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',captainRouter); // Use the captain router
app.use('/',captainProfileRouter)



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
