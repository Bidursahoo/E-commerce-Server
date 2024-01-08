const router = require("express").Router();
const fetchAllUserData = require("../../Controller/User Controller/fetchAllUserData")
router.get("/fetchAllUserData" , fetchAllUserData);
const updateUser = require("../../Controller/User Controller/updateUser")
router.put('/updateUser',updateUser)
const deleteUser = require("../../Controller/User Controller/deleteUser")
router.delete("/deleteUser" , deleteUser)

module.exports = router;