const mongoose = require('mongoose');





const connectDB=async()=>{
    await mongoose.connect(

"mongodb+srv://akshayjyothip:GSSg191nCzqbp6j5@uber.yi45r49.mongodb.net/"


   
)
}






module.exports = connectDB;