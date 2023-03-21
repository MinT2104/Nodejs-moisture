const router = require("express").Router()
const projectController = require("../controllers/projectController")


router.get("/", projectController.getAllProject)
router.get("/:uid", projectController.getAProject)
router.post("/", projectController.postProject)
router.put("/:uid", projectController.putAProject)
router.delete("/:uid", projectController.deleteAProject)


module.exports = router;