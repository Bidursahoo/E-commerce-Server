const mongoose = require("mongoose");
const {Schema} = mongoose;
const productSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    productPictures: {
        type: [
            {
                name: { type: String },
                type: { type: String },
                downloadURL: { type: String },
            },
        ],
    },
    category:{
        type:String,
    },
    available:{
        type:Boolean,
    },
    seller:{
        type:String,
        required:true
    },
    sellerId:{
        type:String,
        required:true
    }

})
Product = mongoose.model("product" , productSchema) 
module.exports = {Product};