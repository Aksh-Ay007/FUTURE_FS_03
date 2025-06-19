const express=require('express')
const Captain=require('../models/captain')
const {captainAuth}=require('../middlewares/auth')

const captainProfileRouter=express.Router()


captainProfileRouter.get('/captain/profile',captainAuth,async(req,res)=>{
    try {
        const captain=req.captain

        res.send(captain)
    } catch (error) {
        res.status(500).json({message:"Internal server error",error:error.message})
    }
})

module.exports=captainProfileRouter