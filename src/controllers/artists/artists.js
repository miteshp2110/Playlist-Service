const { pool } = require("../../config/db");

const addArtist = (async(req,res)=>{
    try{
        const {name} = req.body
        const file = req.file

        if(!name || !file){
            return res.status(400).json({Mesaage:"Invalid Request"})
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/artist-profile/${file.filename}`
        const [result] = await pool.query("Select id from artists where name = ?",[name])
        
        if(result.length == 0){
            await pool.query("INSERT INTO artists (name,profile_image) values(?,?)",[name,imageUrl])
            return res.status(201).json({Message:"Artist Added"})
        }
        else{
            const id = result[0].id
            await pool.query("update artists set profile_image = ? where id = ?",[imageUrl,id])
            return res.status(201).json({Message:"Artist Updated"})
        }

        
    }
    catch(err){
        if(err.code === "ER_DUP_ENTRY"){

            return res.status(500).json({Message:"Artist already exists."})
        }
        console.error(err)
        return res.status(500).json({Message:"Some Error Occured"})
    }
})


const getAllArtist = (async(req,res)=>{
    try{

        const [result] = await pool.query("Select * from artists")
        return res.status(200).json(result)

    }
    catch(err){
        console.error(err)
        return res.status(500).json({Message:"Some Error Occured"})
    }
}) 

module.exports = {addArtist,getAllArtist}