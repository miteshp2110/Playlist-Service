const express = require("express")
const { testConnection } = require("./config/db")
const app = express()
const status = require('express-status-monitor')
const cors = require('cors')

app.use(express.json())

testConnection()
app.use(cors())
app.use(status())
app.use("/uploads",express.static("uploads"))
app.use('/auth',require('./routes/auth-routes'))
app.use("/languages",require('./routes/language-routes'))
app.use("/genere",require('./routes/genere-routes'))
app.use("/artists",require('./routes/artists-routes'))
app.use("/song",require('./routes/songs-routes'))
app.use("/stream",require('./routes/stream-routes'))
app.use("/favourite",require('./routes/favourite-routes'))
app.use("/playlist",require('./routes/playlist-routes'))









module.exports = app