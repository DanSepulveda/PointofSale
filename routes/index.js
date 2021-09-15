const express = require("express");

const productControllers = require('../controllers/productControllers')

const router = express.Router()

router.route('/')
    .get(productControllers.getProducts)

router.route('/nueva-venta')
    .get(productControllers.newSale)

router.route('/historial-ventas')
    .get(productControllers.salesRecord)

router.route('/compras')
    .get(productControllers.newPurchase)

router.route('/historial-compras')
    .get(productControllers.purchasesRecord)

router.route('/clientes')
    .get(productControllers.getClients)

router.route('/productos')
    .get(productControllers.getClients)

module.exports = router