const fs = require('fs')
const path = require('path')
const { pool } = require('../../config/db')
const getSongName = require('../../utils/getSongName')


const streamMusic = (async(req,res)=>{
    try{
        const {id} = req.query
        if(id){
            const [result] = await pool.query('select song_url from songs where id = ?',[id])
            if(result.length === 0){
                return res.status("404").json({Message:"Song Not Found"})
            }
            const songUrl = result[0].song_url
            const songName = getSongName(songUrl)
            const stream = fs.createReadStream(`./uploads/songs/${songName}`)
            res.header({
                "Content-Type":"audio/mpeg",
                "Transfer-Encoding":"chunked"
            })
            stream.pipe(res)
            
        }
        else{
            return res.status(400).json({Message:"Id needed"})
        }

    }
    catch(err){
        console.error(err)
        return res.status(500).json({Message:"Some Error Occured"})
    }
})

module.exports = streamMusic