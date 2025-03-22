const express = require("express")
const router = express.Router()
const adminLogin = require("../controllers/auth/admin-login")
const authorizeUser = require("../controllers/auth/user-auth")
const init = require('../controllers/auth/initialization')

router.post("/admin/login",adminLogin)
router.post("/user/authenticate",authorizeUser)
router.get("/init",init)


module.exports = router