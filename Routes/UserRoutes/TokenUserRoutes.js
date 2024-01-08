const router = require("express").Router();
const fetchById = require("../../Controller/User Controller/fetchByID")
router.get("/fetchMyData" , fetchById);



module.exports = router;