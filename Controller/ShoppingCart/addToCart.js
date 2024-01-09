const { ShoppingCart } = require("../../Models/ShoppingCart/shoppingCart.schema");
const { Product } = require("../../Models/ProductModel/Product.schema");

const addToCart = async (req, res) => {
  try {
    const { userId, body } = req;
    const customerId = userId;
    const productIds = body.productIds;

    let shoppingCart = await ShoppingCart.findOne({ customerId });

    if (!shoppingCart) {
      const newShoppingCart = new ShoppingCart({
        customerId,
        productDetails: [],
      });
      shoppingCart = await newShoppingCart.save();
    }

    for (const item of productIds) {
      const { prodId, quantity } = item;

      const existingProductIndex = shoppingCart.productDetails.findIndex(
        (product) => product.productId.toString() === prodId
      );

      if (existingProductIndex !== -1) {
        shoppingCart.productDetails[existingProductIndex].quantity += quantity;
      } else {
        const product = await Product.find({ _id: prodId });

        if (product.length > 0) {
          shoppingCart.productDetails.push({
            productId: prodId,
            quantity,
            name: product[0].name,
          });
        }
      }
    }

    await shoppingCart.save();

    res.status(200).send({
      data: shoppingCart,
      message: "Products added to the shopping cart successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      errorDetail: error,
      message: "An error occurred while processing the request.",
    });
  }
};

module.exports = addToCart;
