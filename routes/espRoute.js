const router = require("express").Router();
const espController = require("../controllers/espController");
const espFeedsController = require("../controllers/espFeedsController");

// router.get("/", espController.getField)
router.get(`/`, espController.getUserField);
router.get("/:pid", espController.getAField);
router.post("/addFeed", espFeedsController.addFeed);
router.post("/feed.json", espFeedsController.getFeed);
router.post("/getallfeed", espFeedsController.getAllFeed);
router.post("/", espController.addField);
router.delete("/:pid", espController.delField);

module.exports = router;
