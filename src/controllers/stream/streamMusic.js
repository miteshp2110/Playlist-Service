const fs = require('fs');
const path = require('path');
const { pool } = require('../../config/db');
const getSongName = require('../../utils/getSongName');

const streamMusic = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ Message: "Id needed" });
        }

        const [result] = await pool.query('SELECT song_url FROM songs WHERE id = ?', [id]);
        if (result.length === 0) {
            return res.status(404).json({ Message: "Song Not Found" });
        }

        const songUrl = result[0].song_url;
        const songName = getSongName(songUrl);
        const filePath = `./uploads/songs/${songName}`;
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ Message: "File Not Found" });
        }

        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const range = req.headers.range;
        
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = (end - start) + 1;

            res.status(206);
            res.set({
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize,
                "Content-Type": "audio/mpeg"
            });

            const readStream = fs.createReadStream(filePath, { start, end });
            readStream.pipe(res);
            readStream.on('error', (err) => {
                console.error("Stream Error:", err);
                res.status(500).json({ Message: "Error streaming file" });
            });
        } else {
            res.setHeader("Content-Type", "audio/mpeg");
            res.setHeader("Transfer-Encoding", "chunked");

            const readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
            readStream.on('error', (err) => {
                console.error("Stream Error:", err);
                res.status(500).json({ Message: "Error streaming file" });
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ Message: "Some Error Occurred" });
    }
};

module.exports = streamMusic;
