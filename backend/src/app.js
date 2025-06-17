const express = require("express");

const cookieParser = require("cookie-parser"); // Import cookie-parser if you need to handle cookies

const app = express();
const connectDB = require("./config/database");
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware if you need to handle cookies


const authRouter = require("./routes/auth"); 

app.use('/',authRouter);



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
