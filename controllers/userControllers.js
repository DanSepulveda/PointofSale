const Employee = require('../models/Employee')
const Product = require('../models/Product')
const Sale = require('../models/Sale')
const bcryptjs = require('bcryptjs');
require("dotenv").config();
let moment = require('moment')

const userControllers = {
    signUpView: (req, res) => {
        if (req.session.loggedIn && req.session.rol === "admin") {
            res.render('employees', {
                title: 'Nuevo Empleado - POS',
                heading: 'Crear Nuevo Empleado',
                user: req.session.username,
                image: req.session.image,
                rol: req.session.rol,
                error: null,
                message: null
            })
        } else {
            res.redirect('/')
        }
    },
    signUp: async (req, res) => {
        const { name, lastName, dni, address, image, email, password } = req.body
        let hashedPass = bcryptjs.hashSync(password, 10)
        const user = new Employee({
            name,
            lastName,
            dni,
            address,
            image,
            email,
            password: hashedPass
        })
        try {
            if (req.session.loggedIn && req.session.rol === "admin") {
                let chosenUser = await Employee.findOne({ dni })
                let error, message
                if (!chosenUser) {
                    await user.save()
                    error = null
                    message = 'Usuario creado exitosamente'
                } else {
                    error = true
                    message = 'El usuario ya existe.'
                }
                res.render('employees', {
                    title: 'Nuevo Empleado - POS',
                    heading: 'Crear Nuevo Empleado',
                    user: req.session.username,
                    image: req.session.image,
                    rol: req.session.rol,
                    error,
                    message
                })
            } else {
                throw new Error()
            }
        } catch (error) {
            res.render('employees', {
                title: 'Nuevo Empleado - POS',
                heading: 'Crear Nuevo Empleado',
                user: req.session.username,
                image: req.session.image,
                rol: req.session.rol,
                error: true,
                message: 'Algo salió mal. Contacte a soporte.'
            })
        }
    },
    signInView: (req, res) => {
        if (!req.session.loggedIn) {
            res.render('index', {
                title: 'POS - Home',
                error: null,
                message: null
            })
        } else {
            res.redirect('/escritorio')
        }
    },
    signIn: async (req, res) => {
        const { dni, password } = req.body
        try {
            let user = await Employee.findOne({ dni })
            if (!user) throw new Error("RUT y/o clave incorrecta.")
            let passMatch = bcryptjs.compareSync(password, user.password)
            if (!passMatch) throw new Error("RUT y/o clave incorrecta.")
            req.session.loggedIn = true
            req.session.username = user.name
            req.session.image = user.image
            req.session.rol = user.rol
            res.redirect('/escritorio')
        } catch (error) {
            res.render('index', {
                title: 'POS - Home',
                error: true,
                message: error
            })
        }
    },
    signOut: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/')
        })
    },
    dashboard: async (req, res) => {
        if (req.session.loggedIn) {
            let employees = await Employee.find()
            let products = await Product.find()
            let sales = await Sale.find()
            sales.forEach((sale) => sale.productQty = sale.products.reduce((total, product) => {
                total += product.qty
                return total
            }, 0))
            sales.forEach((sale) => sale.total = sale.products.reduce((total, product) => {
                total += product.price * product.qty
                return total
            }, 0))
            const formatter = new Intl.NumberFormat('es-CL', {
                style: 'currency',
                currency: 'CLP',
            });
            sales.forEach((sale) => sale.total = formatter.format(sale.total))
            return res.render('dashboard', {
                title: 'Dashboard - POS',
                heading: 'Escritorio',
                user: req.session.username,
                image: req.session.image,
                rol: req.session.rol,
                employees,
                products: products.sort((a, b) => a.stock - b.stock),
                sales
            })
        }
        res.redirect('/')
    },
}

module.exports = userControllers