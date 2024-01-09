



const { ShoppingCart } = require("../../Models/ShoppingCart/shoppingCart.schema");

const viewMyCart=async (req, res) => {
    try {
      const { userId } = req;
      const customerId = userId;
  
      const shoppingCart = await ShoppingCart.findOne({ customerId });
  
      if (!shoppingCart) {
        return res.status(404).send({
          message: "Shopping cart not found for the given customer ID.",
        });
      }
  
      res.status(200).send({
        data: shoppingCart.productDetails,
        message: "Products retrieved from the shopping cart successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({
        errorDetail: error,
        message: "An error occurred while processing the request.",
      });
    }
  }


  module.exports = viewMyCart