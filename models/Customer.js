const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    rol: { type: String },
    name: { type: String },
    lastName: { type: String },
    dni: { type: Number },
    email: { type: String }
})

const employeeSchema = new mongoose.Schema({
    basicInformation: userSchema,
    password: { type: String },
    address: { type: String }
})

module.exports = {
    customer: mongoose.model('customer', userSchema),
    employee: mongoose.model('employee', employeeSchema)
}