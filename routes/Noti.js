const router = require("express").Router()
const notiController = require("../controllers/notiController")


router.post(`/addnew`, notiController.addNewnoti)
router.post(`/getusernoti`, notiController.getUserNoti)


module.exports = router;
