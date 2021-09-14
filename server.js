const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
require("dotenv").config();
require("./config/database");
require("./config/passport")

const app = express()

// MIDDLEWARE
app.use(cors())
app.use(express.json())

app.use('/', router)

app.listen(process.env.PORT || 4000, process.env.HOST || '0.0.0.0', () => console.log('Server listening on port 4000'))