const router = require("express").Router()
const userController = require("../controllers/userController")


router.post("/register", userController.signup) 
router.post("/login", userController.login) 
router.post("/getauser", userController.getAUser) 
router.post("/add", userController.AddFirebaseUser) 
router.put("/update", userController.updateUserPid) 
router.put("/deluserpid", userController.delUserPid) 

module.exports = router;