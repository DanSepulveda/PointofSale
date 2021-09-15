const path = require('path')

const productControllers = {
    getProducts: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/index.html'))
    }
}

module.exports = productControllers