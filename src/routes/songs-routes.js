const express = require('express');
const multer  = require('multer');
const path    = require('path');
const checkUser = require('../middlewares/checkUser');
const { addSong, getTrendingSong, searchSong, getAllSongs, getAllSongsMobile, getSongsByArtist, getSongById, getNextSong } = require('../controllers/songs/songs');
const { get } = require('http');
const router  = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Route the file based on the field name
    if (file.fieldname === 'song_image') {
      cb(null, "uploads/song-profile/");
    } else if (file.fieldname === 'song') {
      cb(null, "uploads/songs/");
    } else {
      cb(new Error("Unexpected field"), null);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage });

router.post(
  "/",
  checkUser("admin"),
  upload.fields([
    { name: 'song_image', maxCount: 1 },
    { name: 'song', maxCount: 1 }
  ]),
  addSong
);

router.get("/trending",checkUser("user"),getTrendingSong)
router.get("/search",checkUser("user"),searchSong)
router.get("/all",checkUser("admin"),getAllSongs)
router.get("/all/mobile",checkUser("admin"),getAllSongsMobile)
router.get("/artist/",checkUser("user"),getSongsByArtist)
router.get("/player/",checkUser("any"),getSongById)
router.get("/next",checkUser("any"),getNextSong)
module.exports = router;
