const router = require("express").Router()
const loginController = require("../controllers/LoginController")


router.post("/", loginController.login) 

module.exports = router;
