const Product = require('../models/Product')

const productControllers = {
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
    readProducts: async (req, res) => {
        try {
            const allProducts = await Product.find()
            if (req.session.loggedIn && req.session.rol === "admin") {
                res.render('products', {
                    title: 'Productos - Vencil',
                    heading: 'Productos',
                    editMode: false,
                    error: null,
                    user: req.session.username,
                    image: req.session.image,
                    rol: req.session.rol,
                    allProducts
                })
            } else {
                throw new Error()
            }
        } catch (error) {
            res.redirect('/escritorio')
        }

    },
    updateProduct: async (req, res) => {
        const allProducts = await Product.find()
        const productToEdit = await Product.findOne({ _id: req.params.id })
        var idNum = productToEdit._id.toString()
        res.render('products', {
            title: 'Editar producto - Vencil',
            heading: 'Editar producto',
            editMode: productToEdit,
            error: null,
            allProducts
        })

    },
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