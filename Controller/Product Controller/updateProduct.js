
const { Product } = require("../../Models/ProductModel/Product.schema");
// const jwt = require('jsonwebtoken');
const updateProduct = async (req, res) => {
    // console.log(req.params['id'])
    if(!req.params['id']){
        return res.status(401).send({ message: "no product id sent" });
    }
    try {
      const product = await Product.findOneAndUpdate({_id:req.params['id']}, {$set:req.body},{new:true}).select("-productPicture-__v")
      res.status(200).send({ status:"Success", data: product });
    } catch (error) {
    //   console.error("Error:", error);
      res.status(500).send({ message: "An error occurred while updating product." });
    }
  };
  
  module.exports = updateProduct;
  