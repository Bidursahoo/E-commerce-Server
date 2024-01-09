
const mongoose = require("mongoose");
const {Schema} = mongoose;
const orderSchema = new Schema({
    buyerName:{
        type:String,
        required:true,
    },
    purchaseDetails:{
        type:[
            {
                name:{
                    type:String,
                },
                quantity:{
                    type:Number,
                }
            }
        ],
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    phoneNumber: {
        type: Number,
        required:true
    },
    paymentStatus:{
        type:Boolean,
        required:true
    },
    productId:{
        type:[
            {type:String}
        ]
    },
    customerId:{
        type: String
    }

})
Orders = mongoose.model("order" , orderSchema) 
module.exports = {Orders};