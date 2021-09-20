const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    rol: { type: String, default: 'employee' },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    image: { type: String, required: true },
    dni: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true }
})

module.exports = mongoose.model('employee', employeeSchema)