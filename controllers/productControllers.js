const path = require('path')
const Product = require('../models/Product')

const productControllers = {
    home: (req, res) => {
        res.render('index', {
            title: 'Vencil - Home',
        })
    },
    dashboard: (req, res) => {
        res.render('dashboard', {
            title: 'Dashboard - Vencil',
            heading: 'Escritorio'
        })
    },
    salesRecord: (req, res) => {
        res.render('sales-records', {
            title: 'Historial de Ventas - Vencial',
            heading: 'Historial de Ventas'
        })
    },
    newPurchase: (req, res) => {
        res.render('new-purchase', {
            title: 'Nueva Compra - Vencil',
            heading: 'Nueva Compra'
        })
    },
    purchasesRecord: (req, res) => {
        res.render('purchase-records', {
            title: 'Historial de Compras - Vencil',
            heading: 'Historial de Compras'
        })
    },
    clients: (req, res) => {
        res.render('customers', {
            title: 'Clientes - Vencil',
            heading: 'Clientes'
        })
    },

    // ya funciona
    createProduct: async (req, res) => {
        const { name, category, brand, stock, price, image, _id } = req.body
        let newProduct
        if (!_id) {
            newProduct = new Product({
                name, category, brand, stock, price, image
            })
        } else {
            newProduct = await Product.findOne({ _id })
            newProduct.name = name
            newProduct.category = category
            newProduct.brand = brand
            newProduct.stock = stock
            newProduct.image = image
            newProduct.price = price
        }

        try {
            await newProduct.save()
            res.redirect('/productos')
        } catch (error) {
            res.render('products', {
                title: 'Productos - Vencil',
                heading: 'Productos',
                editMode: false,
                error: true,
                allProducts: []
            })
        }
    },
    //ya funciona
    readProducts: async (req, res) => {
        try {
            let page
            const allProducts = await Product.find()
            if (req.route.path === '/productos') {
                page = {
                    view: 'products',
                    options: {
                        title: 'Productos - Vencil',
                        heading: 'Productos',
                        editMode: false,
                        error: null,
                        allProducts
                    }
                }
                // res.render('products', {
                //     title: 'Productos - Vencil',
                //     heading: 'Productos',
                //     allProducts
                // })
            } else {
                page = {
                    view: 'new-sale',
                    options: {
                        title: 'Nueva Venta - Vencil',
                        heading: 'Nueva Venta',
                        allProducts
                    }
                }
                // res.render('new-sale', {
                //     title: 'Nueva Venta - Vencil',
                //     heading: 'Nueva Venta',
                //     allProducts
                // })
            }
            res.render(page.view, { ...page.options })
        } catch (error) {
            res.redirect('/error')
        }

    },
    //
    updateProduct: async (req, res) => {
        const allProducts = await Product.find()
        const productToEdit = await Product.findOne({ _id: req.params.id })
        res.render('products', {
            title: 'Editar producto - Vencil',
            heading: 'Editar producto',
            editMode: productToEdit,
            error: null,
            allProducts
        })

    },
    // ya funciona
    deleteProduct: async (req, res) => {
        try {
            await Product.findOneAndDelete({ _id: req.params.id })
            res.json({ success: true })
        } catch (error) {
            res.json({ success: false })
        }
    }
}

module.exports = productControllers