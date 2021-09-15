const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    category: { type: String },
    subcategory: { type: String },
    name: { type: String },
    price: { type: Number },
    stock: { type: Number },
    brand: { type: String },
})

module.exports = mongoose.model('product', productSchema)