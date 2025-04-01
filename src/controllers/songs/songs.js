const { pool } = require("../../config/db")
const getSongDuration = require("../../utils/songDuration")

const addSong = (async(req,res)=>{
    try{
        const{name,language,genere,artist} = req.body
        const songImage = (req.files['song_image'])[0].filename
        const song = (req.files['song'])[0].filename
        const duration = await getSongDuration(`./uploads/songs/${song}`)
        const songImageUrl = `https://${req.get('host')}/service/uploads/song-profile/${songImage}`
        const songUrl = `https://${req.get('host')}/service/uploads/songs/${song}`
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
        const [result] = await pool.query("Select id,name,song_image_url from songs limit 6")
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

const getAllSongs = (async (req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page - 1) * limit

        const [result] = await pool.query("select * from songs limit ? offset ?",[limit,offset])

        return res.status(200).json(result)

    }
    catch(err){
        console.error(err)
        return res.status(500).json({Message:"Some Error Occured"})
    }
})

const getAllSongsMobile = (async (req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page - 1) * limit

        const [result] = await pool.query("SELECT songs.id, songs.name, languages.name AS language, genere.name AS genere, artists.name AS artist, songs.duration, songs.song_image_url FROM songs JOIN languages ON songs.language = languages.id JOIN genere ON songs.genere = genere.id JOIN artists ON songs.artist = artists.id LIMIT ? OFFSET ?;",[limit,offset])

        return res.status(200).json(result)

    }
    catch(err){
        console.error(err)
        return res.status(500).json({Message:"Some Error Occured"})
    }
})





module.exports = {addSong,getTrendingSong,searchSong,getAllSongs,getAllSongsMobile}