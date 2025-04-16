const {pool} = require('../../config/db')

async function addPlaylist(req,res){
   try{
        const email = req.user
        const {playlistName,songsList} = req.body
        if(!playlistName || !songsList || songsList.length === 0){
            return res.status(400).json({Message:"Invalid Body"})
        }
        
        const [result] = await pool.query('insert into playlists (name,user_id) values (?,(select id from users where email = ?))',[playlistName,email])

        const playlistId =  result.insertId
        var songsInsertionQuery = 'insert into playlist_songs (playlist_id,song_id) values '
        songsList.forEach(song => {
            var newValue = `(${playlistId},${song})`
            songsInsertionQuery += newValue + ','
        
        });
        songsInsertionQuery = songsInsertionQuery.slice(0,songsInsertionQuery.length-1)

        await pool.query(songsInsertionQuery)

        return res.status(201).json({Message:`${playlistId}`})
   }
   catch(err){
    if(err.code === "ER_DUP_ENTRY"){

        return res.status(500).json({Message:"Playlist already exist already exists."})
    }
    console.error(err)
    return res.status(500).json({Message:"Some Error Occured"})
   }

}

async function getPlaylists(req,res){
    try{
        const email = req.user
        const [result] = await pool.query('SELECT p.id AS playlist_id, p.name AS playlist_name, (SELECT s.song_image_url FROM playlist_songs ps_inner JOIN songs s ON ps_inner.song_id = s.id WHERE ps_inner.playlist_id = p.id LIMIT 1) AS playlist_image_url, COUNT(ps.song_id) AS total_songs, SUM(so.duration) AS total_duration_seconds FROM playlists p JOIN playlist_songs ps ON p.id = ps.playlist_id JOIN songs so ON ps.song_id = so.id WHERE p.user_id = (SELECT id FROM users WHERE email = ?) GROUP BY p.id, p.name',[email])
        
        return res.status(200).json(result)
    }
    catch(err){
        console.error(err)
        return res.status(500).json({Message:"Some Error Occured"})
    }
}

async function getPlaylistSongs(req,res){
    try{ 
        const playlistId = parseInt(req.params.playlistId)
        if(!playlistId){
            return res.status(400).json({Message:"Invalid Body"})
        }
        
        const [result] = await pool.query('select song_id from playlist_songs where playlist_id = ?',[playlistId])

        const songsList = []
        result.forEach(song => {
            songsList.push(song.song_id)
        })
        
        return res.status(200).json(songsList)
    }
    catch(err){
        console.error(err)
        return res.status(500).json({Message:"Some Error Occured"})
    }
}


module.exports = {addPlaylist,getPlaylists,getPlaylistSongs}