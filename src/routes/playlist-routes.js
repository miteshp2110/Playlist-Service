const express = require("express")
const checkUser = require("../middlewares/checkUser")
const { addPlaylist, getPlaylists, getPlaylistSongs } = require("../controllers/playlist/playlist")

const router = express.Router()

router.post("/add",checkUser("user"),addPlaylist)
router.get("/get",checkUser("user"),getPlaylists)
router.get("/get/:playlistId",checkUser("user"),getPlaylistSongs)



module.exports = router