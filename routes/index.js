const express = require("express");

const productControllers = require('../controllers/productControllers')
const saleControllers = require('../controllers/saleControllers')
const userControllers = require('../controllers/userControllers')

const router = express.Router()

router.route('/')
    .get(productControllers.home)

router.route('/escritorio')
    .get(productControllers.dashboard)

// USERS
router.route('/crear-cuenta')
    .get(userControllers.signUpView)
    .post(userControllers.signUp)


// SALES
router.route('/nueva-venta')
    .get(productControllers.readProducts)
    .post(saleControllers.createSale)

// revisar
router.route('/historial-ventas')
    .get(productControllers.salesRecord)

// PRODUCTS
router.route('/productos')
    .post(productControllers.createProduct)
    .get(productControllers.readProducts)

router.route('/editar-producto/:id')
    .get(productControllers.updateProduct)

router.route('/borrar-producto/:id')
    .delete(productControllers.deleteProduct)

module.exports = router