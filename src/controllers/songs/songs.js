const { pool } = require("../../config/db")
const getSongDuration = require("../../utils/songDuration")

const addSong = (async(req,res)=>{
    try{
        const{name,language,genere,artist} = req.body
        const songImage = (req.files['song_image'])[0].filename
        const song = (req.files['song'])[0].filename
        const duration = await getSongDuration(`./uploads/songs/${song}`)
        const songImageUrl = `${req.protocol}://${req.get('host')}/uploads/song-profile/${songImage}`
        const songUrl = `${req.protocol}://${req.get('host')}/uploads/songs/${song}`
        await pool.query("insert into songs (name,language,genere,artist,song_image_url,song_url,duration) values (?,?,?,?,?,?,?)",[name,language,genere,artist,songImageUrl,songUrl,duration])
        return res.status(201).json({Message:"Added Song"})
    }
    catch(err){
        if(err.code === "ER_DUP_ENTRY"){

            return res.status(500).json({Message:"Song already exists."})
        }
        console.error(err)
        return res.status(500).json({Message:"Some Error Occured"})
    }
})

const getTrendingSong = (async(req,res)=>{
    try{
        const [result] = await pool.query("Select * from songs limit 4")
        return res.status(200).json(result)
    }
    catch(err){
        console.error(err)
        return res.status(500).json({Message:"Some Error Occured"})
    }
})

const searchSong = (async(req,res)=>{
    try{
        const {name} = req.query
        if(name){
            const [result] = await pool.query("Select * from songs where name LIKE ? limit 15",[`${name}%`])
            return res.status(200).json(result)
        }
    }
    catch(err){
        console.error(err)
        return res.status(500).json({Message:"Some Error Occured"})
    }
})




module.exports = {addSong,getTrendingSong,searchSong}