const express = require("express");

const productControllers = require('../controllers/productControllers')
const saleControllers = require('../controllers/saleControllers')
const userControllers = require('../controllers/userControllers')

const router = express.Router()

// USERS
router.route('/')
    .get(userControllers.signInView)
    .post(userControllers.signIn)

router.route('/escritorio')
    .get(userControllers.dashboard)

router.route('/crear-cuenta')
    .get(userControllers.signUpView)
    .post(userControllers.signUp)

router.route('/salir')
    .get(userControllers.signOut)

// SALES
router.route('/nueva-venta')
    .get(saleControllers.showProducts)
    .post(saleControllers.createSale)

// router.route('/historial-ventas')
//     .get(saleControllers.salesRecord)

// PRODUCTS
router.route('/productos')
    .post(productControllers.createProduct)
    .get(productControllers.readProducts)

router.route('/editar-producto/:id')
    .get(productControllers.updateProduct)

router.route('/borrar-producto/:id')
    .delete(productControllers.deleteProduct)

module.exports = router