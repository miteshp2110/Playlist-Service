const express = require("express")
const router = express.Router()
const adminLogin = require("../controllers/auth/admin-login")

router.post("/admin/login",adminLogin)


module.exports = router