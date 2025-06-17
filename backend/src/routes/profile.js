
const express=require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const profileRouter = express.Router();

profileRouter.get('/profile',userAuth,async(req,res)=>{

 try {
       const user=req.user;

    res.send(user)
    
 } catch (error) {
    
    res.status(500).json({ message: "Internal server error", error: error.message });
 }
})

module.exports = profileRouter;