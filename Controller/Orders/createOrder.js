const { Orders } = require("../../Models/Orders/Orders.schema");
const { ShoppingCart } = require("../../Models/ShoppingCart/shoppingCart.schema")
const { Product } = require("../../Models/ProductModel/Product.schema");

const orderCreation = async (req, res) => {
  try {
    const { userName, userId, userAddress, userPhone } = req;
    const buyerName = userName;
    const customerId = userId;
    const address = userAddress;
    const phoneNumber = userPhone;
    const shoppingCart = await ShoppingCart.findOne({ customerId });

    if (!shoppingCart || shoppingCart.productDetails.length === 0) {
      return res.status(400).send({
        message: "Shopping cart is empty. Add products to the cart first.",
      });
    }
    const purchaseDetails = shoppingCart.productDetails.map((product) => {
      return {
        name: product.name,
        quantity: product.quantity,
      };
    });

    const productId = shoppingCart.productDetails.map((product) => product.productId);

    const newOrder = new Orders({
      buyerName,
      customerId,
      purchaseDetails,
      productId,
      phoneNumber,
      address,
      paymentStatus: true,
    });
    const savedOrder = await newOrder.save();
    await ShoppingCart.findOneAndDelete({ customerId });

    res.status(200).send({
      data: savedOrder,
      message: "Order created successfully, and shopping cart cleared.",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      errorDetail: error,
      message: "An error occurred while processing the request.",
    });
  }
};

module.exports = orderCreation;
