const {pool} = require('../../config/db')

async function addFavourite(req,res){
   try{
        const email = req.user
        const {songId} = req.body
        if(!email || ! songId){
            return res.status(400).json({Message:"Invalid Body"})
        }
        const [response] = await pool.query('Select id from users where email = ?',[email])
        const uId = response[0].id

        const [result] = await pool.query("insert into favourites(user_id,song_id) values (?,?)",[uId,songId])
        
        return res.status(201).json({Message:`${result.insertId}`})
   }
   catch(err){
    
    console.error(err)
    return res.status(500).json({Message:"Some Error Occured"})
   }

}

async function getFavourites(req,res){
    try{
         const email = req.user
         const limit = parseInt(req.query.limit) || 6
         if(!email){
             return res.status(400).json({Message:"Invalid Body"})
         }
         const [resp] = await pool.query('Select id from users where email = ?',[email])
        const uId = resp[0].id
         const [response] = await pool.query(' select favourites.id as favId, songs.id as songId, songs.name as songName,songs.song_image_url,artists.name as artistName from songs join favourites join artists where favourites.song_id = songs.id and songs.artist = artists.id and favourites.user_id = ? limit ?',[uId,limit])
    
         return res.status(200).json(response)
    }
    catch(err){
     
     console.error(err)
     return res.status(500).json({Message:"Some Error Occured"})
    }
 
 }

 async function removeFavourite(req,res){
    try{
         const email = req.user
         const {favId} = req.body
         if(!email || ! favId){
             return res.status(400).json({Message:"Invalid Body"})
         }
         
         await pool.query("delete from favourites where id = ?",[favId])
         
         return res.status(200).json({Message:"Removed from Favourites"})
    }
    catch(err){
     
     console.error(err)
     return res.status(500).json({Message:"Some Error Occured"})
    }
 
 }




module.exports = {addFavourite,getFavourites,removeFavourite}