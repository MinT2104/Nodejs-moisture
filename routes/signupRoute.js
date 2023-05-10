const router = require("express").Router()
const signupController = require("../controllers/SignupController")


router.post("/", signupController.signup) 

module.exports = router;
