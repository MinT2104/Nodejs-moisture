const router = require("express").Router();
const rainController = require("../controllers/rainController");
const rainFeedsController = require("../controllers/rainFeedsController");

router.post("/newrain", rainController.newRan);
router.post("/addFeed", rainFeedsController.addFeed);
router.post("/getone", rainController.getOne);
router.post("/alluserrain", rainController.getAllUserRain);
router.post("/feed.json", rainFeedsController.getFeed);
router.post("/getallfeed", rainFeedsController.getAllFeed);
router.put("/deleteAItemAtFeed", rainFeedsController.delAnItemFeed);

module.exports = router;
