const router = require("express").Router()
const pumpController = require("../controllers/pumpController")

router.get("/", pumpController.getField)
router.get("/:pid", pumpController.getAField)
router.put("/:pid", pumpController.putField)
router.post("/", pumpController.addField)
router.delete("/:pid", pumpController.delField)

module.exports = router;
