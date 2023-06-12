const router = require("express").Router()
const userController = require("../controllers/userController")


router.post("/register", userController.signup) 
router.post("/login", userController.login) 
router.post("/getauser", userController.getAUser) 
router.post("/add", userController.AddFirebaseUser) 
router.put("/update_pid", userController.updateUserPid) 
router.put("/update_props", userController.updateUserprop) 
router.put("/deluserpid", userController.delUserPid) 

module.exports = router;