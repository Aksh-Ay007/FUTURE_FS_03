const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");  // Use bcryptjs for hashing passwords


// Define the user schema   

const userSchema=new mongoose.Schema({

   

     firstName:{
        type:String,
        required:true,
        minlength:[3, 'First name must be at least 3 characters long'],
    },
    lastName:{
        type:String,
        minlength:[3, 'Last name must be at least 3 characters long'],
    
   },
   email:{
    type:String,
    required:true,
    unique:true,
    minlength:[5, 'Email must be at least 5 characters long'],
    trim:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Invalid email format'+ value);    
        }
    
    }

   },
   password:{
    type:String,
    required:true
   },
   socketId:{
    type:String,

   }
},{
    timestamps:true
})


userSchema.methods.getJWT= async function(){
    const user=this;

   const token=await jwt.sign({ _id: user._id }, "uber-clone@123", {
        expiresIn: "1d",
      });

      return token;
}


userSchema.methods.validatePassword= async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password
    return await bcrypt.compare(passwordInputByUser, passwordHash);

}


module.exports=mongoose.model('User',userSchema);