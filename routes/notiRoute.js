const router = require("express").Router()
const notiController = require("../controllers/notiController")


router.post(`/addnew`, notiController.addNewnoti)
router.post(`/getusernoti`, notiController.getUserNoti)
router.put(`/update`, notiController.updateNoti)
router.put(`/delete`, notiController.deleteNoti)


module.exports = router;