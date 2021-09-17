const User = require('../models/User').employee
const bcryptjs = require('bcryptjs')
// const jwt = require('jsonwebtoken')
require("dotenv").config();

const userControllers = {
    signUpView: (req, res) => {
        res.render('employees', {
            title: 'Empleado - Vencil',
            heading: 'Crear Nuevo Empleado',
            message: false
        })
    },
    signUp: async (req, res) => {
        const { name, lastName, dni, address, email, password } = req.body
        let hashedPass = bcryptjs.hashSync(password, 10)
        const user = new User({
            name,
            lastName,
            dni,
            address,
            email,
            password: hashedPass
        })
        try {
            let chosenUser = await User.findOne({ dni })
            if (!chosenUser) {
                await user.save()
                // const token = jwt.sign({ ...user }, process.env.SECRETORKEY)
                res.render('employees', {
                    title: 'Nuevo Empleado - Vencil',
                    heading: 'Crear Nuevo Empleado',
                    message: true
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    signIn: async (req, res) => {
        const { dni, password } = req.body
        try {
            let user = await User.findOne({ dni })
        } catch (error) {

        }
    },
}

module.exports = userControllers