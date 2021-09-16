const express = require("express");
// const cors = require("cors");
const router = require("./routes/index");
require("dotenv").config();
require("./config/database");
// require("./config/passport")

const app = express()

// MIDDLEWARE
app.use(express.static('public'))
app.set('view engine', 'ejs')
// app.use(cors())
app.use(express.urlencoded({ extended: true }))


app.use('/', router)

app.listen(4000, () => console.log('Server listening on port 4000'))