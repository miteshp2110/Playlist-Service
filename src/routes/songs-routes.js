const express = require('express');
const multer  = require('multer');
const path    = require('path');
const checkUser = require('../middlewares/checkUser');
const { addSong, getTrendingSong, searchSong } = require('../controllers/songs/songs');
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

// Use .fields() to handle both song_image and song file uploads in one middleware
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

module.exports = router;
