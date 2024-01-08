const router = require("express").Router();

const addProduct = require("../../Controller/Product Controller/addProduct")
router.post("/addProduct" , addProduct);
const fetchById = require("../../Controller/Product Controller/fetchOwnProducts")
router.get("/fetchMyProduct" , fetchById)
const updateProduct = require("../../Controller/Product Controller/updateProduct")
router.put("/updateProduct/:id", updateProduct)
const deleteProduct = require("../../Controller/Product Controller/deleteProduct")
router.delete("/deleteProduct/:id", deleteProduct)
module.exports = router;