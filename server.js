const express = require("express");
const router = require("./routes/index");
require("dotenv").config();
require("./config/database");
// require("./config/passport")
const session = require("express-session")
const mongo = require('connect-mongodb-session')(session)
const store = new mongo({
    uri: process.env.MONGODB,
    collection: 'sessions'
})

const app = express()

// MIDDLEWARE
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store,
}))


app.use('/', router)

app.listen(process.env.PORT || 4000, process.env.HOST || '0.0.0.0', () => console.log('Server listening on port 4000'))