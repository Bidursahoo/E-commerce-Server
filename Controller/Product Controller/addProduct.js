const mongoose = require("mongoose");
const { Product } = require("../../Models/ProductModel/Product.schema");
// const jwt = require('jsonwebtoken');
const registerCustomer = async (req, res) => {
  // console.log(req.jsonData)
  
    try {
      const newProduct = new Product({
        ...req.jsonData,
        productPictures: req.downloadURLs,
        seller:req.userName,
        sellerId:req.userId
      });
      const savedProduct = await newProduct.save();
      res.status(200).send({
        data: savedProduct,
        message: "Product added successfully",
      });
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .send({
          errorDetail: error,
          message: "An error occurred while processing the request.",
        });
    }
  }
// router.post("/register", );




module.exports = registerCustomer;