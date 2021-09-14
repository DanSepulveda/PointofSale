const express = require("express");

const productControllers = require('../controllers/productControllers')

const router = express.Router()

router.route('/')
    .get(productControllers.getProducts)



module.exports = router