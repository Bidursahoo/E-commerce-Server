
const { Product } = require("../../Models/ProductModel/Product.schema");
// const jwt = require('jsonwebtoken');
const fetchById = async (req, res) => {
    // console.log(req.header)
    try {
      const product = await Product.find({sellerId:req.userId}).select("-sellerId -role -__v");
      res.status(200).send({ data: product });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ message: "An error occurred while fetching products." });
    }
  };
  
  module.exports = fetchById;
  