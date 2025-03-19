const express = require("express")
const streamMusic = require("../controllers/stream/streamMusic")
const checkUser = require("../middlewares/checkUser")
const router = express.Router()


router.get("/listen",checkUser("any"),streamMusic)


module.exports = router