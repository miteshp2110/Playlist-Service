const express = require("express")
const { testConnection } = require("./config/db")
const app = express()
const status = require('express-status-monitor')

app.use(express.json())

testConnection()

app.use(status())
app.use("/uploads",express.static("uploads"))
app.use('/auth',require('./routes/auth-routes'))
app.use("/languages",require('./routes/language-routes'))
app.use("/genere",require('./routes/genere-routes'))
app.use("/artists",require('./routes/artists-routes'))
app.use("/song",require('./routes/songs-routes'))









module.exports = app