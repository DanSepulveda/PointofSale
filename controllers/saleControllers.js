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
            products.forEach(async (product) => {
                let chosen = await Product.findOne({ _id: product.product })
                let newStock = chosen.stock - product.qty
                await Product.findOneAndUpdate(
                    { _id: product.product },
                    { stock: newStock },
                    { new: true }
                )
            })
            let allProducts = await Product.find()
            res.redirect('/nueva-venta')

        } catch (error) {
            let allProducts = await Product.find()
            let categories = [
                { name: 'Todos', image: 'todos.png' },
                { name: 'Abarrotes', image: 'abarrotes.png' },
                { name: 'Frutas', image: 'frutas.png' },
                { name: 'Verduras', image: 'verduras.png' },
                { name: 'Panaderia', image: 'panaderia.png' },
                { name: 'Lacteos', image: 'lacteos.png' },
                { name: 'Fiambres', image: 'fiambres.png' },
                { name: 'Congelados', image: 'congelados.png' },
                { name: 'Bebestibles', image: 'bebestibles.png' },
                { name: 'Helados', image: 'helados.png' },
            ]
            res.render('new-sale', {
                title: 'Nueva Venta - Vencil',
                heading: 'Nueva Venta',
                message: true,
                categories,
                allProducts,
            })
        }
    },
}

module.exports = saleControllers