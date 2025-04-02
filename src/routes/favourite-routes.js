const express = require("express")
const checkUser = require("../middlewares/checkUser")
const { addFavourite, getFavourites, removeFavourite } = require("../controllers/genere/favourite")

const router = express.Router()

router.post("/add",checkUser("user"),addFavourite)
router.get("/all",checkUser("user"),getFavourites)
router.post("/remove",checkUser("user"),removeFavourite)



module.exports = router