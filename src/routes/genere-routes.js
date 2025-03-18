const express = require("express")
const checkUser = require("../middlewares/checkUser")
const { getGenere, addGenere } = require("../controllers/genere/genere")

const router = express.Router()

router.post("/",checkUser("admin"),addGenere)
router.get("/",checkUser("admin"),getGenere)



module.exports = router