const express = require("express");

const productControllers = require('../controllers/productControllers')
const saleControllers = require('../controllers/saleControllers')

const router = express.Router()

router.route('/')
    .get(productControllers.home)

router.route('/escritorio')
    .get(productControllers.dashboard)

router.route('/historial-ventas')
    .get(productControllers.salesRecord)

router.route('/nueva-compra')
    .get(productControllers.newPurchase)

router.route('/historial-compras')
    .get(productControllers.purchasesRecord)

router.route('/clientes')
    .get(productControllers.clients)


// SALES
router.route('/nueva-venta')
    .get(productControllers.readProducts)
    .post(saleControllers.createSale)

// PRODUCTS
router.route('/productos')
    .post(productControllers.createProduct)
    .get(productControllers.readProducts)

router.route('/editar-producto/:id')
    .get(productControllers.updateProduct)

router.route('/borrar-producto/:id')
    .delete(productControllers.deleteProduct)

module.exports = router