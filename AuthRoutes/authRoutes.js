const router = require("express").Router();
const registerCustomer = require("../Controller/Auth Controllers/RegisterCustomer.user")
router.post("/registerCustomer" , registerCustomer)
const registerSeller = require("../Controller/Auth Controllers/RegisterSeller.user")
router.post("/registerSeller" , registerSeller)
const loginUser = require("../Controller/Auth Controllers/Login.user")
router.post('/loginUser',loginUser)

module.exports = router;