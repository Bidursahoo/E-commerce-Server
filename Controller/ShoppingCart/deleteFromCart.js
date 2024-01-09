const { ShoppingCart } = require("../../Models/ShoppingCart/shoppingCart.schema");

const deleteFromCart = async (req, res) => {
  try {
    const { userId, body } = req;
    const customerId = userId;
    const productIdsToDelete = body.productIds;

    let shoppingCart = await ShoppingCart.findOne({ customerId });

    if (!shoppingCart) {
      return res.status(404).send({
        message: "Shopping cart not found for the given customer ID.",
      });
    }
    shoppingCart.productDetails = shoppingCart.productDetails.filter(
      (product) => !productIdsToDelete.includes(product.productId.toString())
    );

    await shoppingCart.save();

    res.status(200).send({
      data: shoppingCart,
      message: "Products deleted from the shopping cart successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      errorDetail: error,
      message: "An error occurred while processing the request.",
    });
  }
};

module.exports = deleteFromCart;
