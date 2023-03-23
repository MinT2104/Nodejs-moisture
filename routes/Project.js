const router = require("express").Router()
const projectController = require("../controllers/projectController")


router.get("/", projectController.getAllProject)
router.get("/:uid", projectController.getAllUserProject)
router.get("/:pid", projectController.getAProject)
router.post("/", projectController.postProject)
router.put("/:pid", projectController.putAProject)
router.delete("/:pid", projectController.deleteAProject)


module.exports = router; 