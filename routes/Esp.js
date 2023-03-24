const router = require("express").Router()
const espController = require("../controllers/espController")

router.get("/", espController.getField)
router.get("/:pid", espController.getAField)
router.post("/", espController.addFeed)
router.post("/", espController.addField)
router.delete("/:pid", espController.delField)

module.exports = router;
