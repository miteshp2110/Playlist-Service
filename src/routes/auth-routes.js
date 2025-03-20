const express = require("express")
const router = express.Router()
const adminLogin = require("../controllers/auth/admin-login")
const authorizeUser = require("../controllers/auth/user-auth")

router.post("/admin/login",adminLogin)
router.post("/user/authenticate",authorizeUser)


module.exports = router