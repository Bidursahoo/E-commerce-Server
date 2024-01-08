const mongoose = require("mongoose");
const joi = require("joi");
const {Schema} = mongoose;
const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone_no:{
        type:Number,
        minlength:10,
        maxlength:10,
        required:true
    },
    address:{
        type:String,
        minlength:10,
    },
    pin:{
        type:Number,
        minlength:6,
        maxlength:6
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    role:{
        type:String
    }

})
User = mongoose.model("User_Data" , userSchema) 
module.exports = {User};