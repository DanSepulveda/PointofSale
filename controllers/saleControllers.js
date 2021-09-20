const Sale = require('../models/Sale')
const Product = require('../models/Product')

const saleControllers = {
    showProducts: async (req, res) => {
        try {
            if (req.session.loggedIn) {
                const allProducts = await Product.find()
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
                    title: 'Nueva Venta - POS',
                    heading: 'Nueva Venta',
                    message: false,
                    user: req.session.username,
                    image: req.session.image,
                    rol: req.session.rol,
                    categories,
                    allProducts,
                })
            } else {
                res.redirect('/')
            }
        } catch (error) {
            res.redirect('/nueva-venta')
        }
    },
    createSale: async (req, res) => {
        try {
            if (req.session.loggedIn) {
                let products = JSON.parse(req.body.products)
                let paymentMethod = req.body.paymentMethod
                let date = new Date()
                date = date.toLocaleDateString()
                const newSale = new Sale({
                    products,
                    paymentMethod,
                    date
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
                res.redirect('/nueva-venta')
            } else {
                throw new Error()
            }
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
                title: 'Nueva Venta - POS',
                heading: 'Nueva Venta',
                message: true,
                user: req.session.username,
                image: req.session.image,
                rol: req.session.rol,
                categories,
                allProducts,
            })
        }
    },
    // salesRecord: async (req, res) => {
    //     try {
    //         if (req.session.loggedIn) {
    //             let sales = await Sale.find()
    //             res.render('sales-records', {
    //                 title: 'Historial de Ventas - POS',
    //                 heading: 'Historial de Ventas',
    //                 user: req.session.username,
    //                 image: req.session.image,
    //                 rol: req.session.rol,
    //                 sales
    //             })
    //         } else {
    //             throw new Error()
    //         }
    //     } catch (error) {
    //         res.redirect('/')
    //     }
    // },
}

module.exports = saleControllers