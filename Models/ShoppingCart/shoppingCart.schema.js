const mongoose = require("mongoose");
const { Schema } = mongoose;
const shoppingCartSchema = new Schema({
  customerId: {
    type: String,
    required: true,
  },
  productDetails: [
    {
      quantity: {
        type: Number,
      },
      productId: {
        type: String,
      },
      name:{
        type:String
      }
    },
  ],
});
const ShoppingCart = mongoose.model("shoppingCart", shoppingCartSchema);
module.exports = {ShoppingCart};
