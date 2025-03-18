const express = require('express')
const multer = require('multer')
const path  = require('path')
const { addArtist, getAllArtist } = require('../controllers/artists/artists')
const checkUser = require('../middlewares/checkUser')
const router = express.Router()

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads/artist-profile/")
    },
    filename : (req,file,cb)=>{
        const ext = path.extname(file.originalname)

        cb(null,file.fieldname + '-' + Date.now() + ext)
    }
})
const upload = multer({storage})

router.post("/",checkUser("admin"),upload.single('profile_image'),addArtist)

router.get("/",checkUser("any"),getAllArtist)

module.exports = router