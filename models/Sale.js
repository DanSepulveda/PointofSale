const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
    date: { type: String, required: true },
    // customer: { type: mongoose.Types.ObjectId, path: "customer" },
    products: [{
        product: { type: mongoose.Types.ObjectId, path: "product" },
        qty: { type: Number },
        price: { type: Number }
    }],
    paymentMethod: { type: String }
})

module.exports = mongoose.model('sale', saleSchema)