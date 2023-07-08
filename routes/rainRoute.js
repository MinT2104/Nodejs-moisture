const router = require("express").Router()
const rainController = require("../controllers/rainController")


router.post("/newrain", rainController.newRan) 
router.post("/addFeed", rainController.addFeed) 
router.get("/getone", rainController.getOne)
router.post("/alluserrain", rainController.getAllUserRain)
router.put("/deleteAItemAtFeed", rainController.delAnItemFeed)

module.exports = router;