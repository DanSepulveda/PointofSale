const express = require("express");
const { get } = require("mongoose");

const productControllers = require('../controllers/productControllers')

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

// ya funciona
router.route('/nueva-venta')
    .get(productControllers.sale)

router.route('/nueva-venta/:id')
    .get(productControllers.newSale)

router.route('/nueva-venta/editar/:id')
    .get(productControllers.updateSale)

// ya funciona
router.route('/productos')
    .post(productControllers.createProduct)
    .get(productControllers.readProducts)

router.route('/editar-producto/:id')
    .get(productControllers.updateProduct)

// ya funciona
router.route('/borrar-producto/:id')
    .delete(productControllers.deleteProduct)

module.exports = router