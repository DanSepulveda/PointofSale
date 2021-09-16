const Sale = require('../models/Sale')
const Product = require('../models/Product')

const saleControllers = {
    createSale: async (req, res) => {
        // console.log(JSON.parse(req.body.products))
        try {
            let products = JSON.parse(req.body.products)
            let paymentMethod = req.body.paymentMethod
            const newSale = new Sale({
                products,
                paymentMethod,
                date: new Date()
            })
            await newSale.save()
            res.redirect('/nueva-venta')
        } catch (error) {
            let allProducts = await Product.find()
            res.render('new-sale', {
                title: 'Nueva Venta - Vencil',
                heading: 'Nueva Venta',
                message: true,
                allProducts,
            })
        }
    }
}

module.exports = saleControllers