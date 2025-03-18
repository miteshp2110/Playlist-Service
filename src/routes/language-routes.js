const express = require("express")
const checkUser = require("../middlewares/checkUser")
const { addLanguage, getLanguage } = require("../controllers/languages/language")
const router = express.Router()

router.post("/",checkUser("admin"),addLanguage)
router.get("/",checkUser("admin"),getLanguage)



module.exports = router