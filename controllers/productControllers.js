const path = require('path')

const productControllers = {
    getProducts: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/index.html'))
    },
    newSale: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/index.html'))
    },
    salesRecord: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/index.html'))
    },
    newPurchase: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/index.html'))
    },
    purchasesRecord: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/index.html'))
    },
    getClients: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/index.html'))
    }
}

module.exports = productControllers