const connection = require('../config/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    const { fullname, email, password } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    if (!fullname.length || !email.length || !password.length) {
        return res
            .status(400)
            .send({ success: false, msg: 'Fill all fields in the form' })
    }

    if (!email.includes('@')) {
        return res
            .status(400)
            .send({ success: false, msg: 'Email is not valid' })
    }

    connection.query(
        'INSERT INTO users (fullname, email, password) VALUES (?,?,?)',
        [fullname, email, hashedPassword],
        (err, result) => {
            if (err) {
                let msg = err.message

                if (err.code === 'ER_DUP_ENTRY') msg = 'This email is busy'

                res.status(400).send({ success: false, msg })
            } else {
                const user = {
                    id: result.insertId,
                    fullname,
                    email,
                }

                const token = jwt.sign(user, process.env.TOKEN_SECRET, {
                    expiresIn: process.env.TOKEN_EXPIRES,
                })

                res.status(201).send({ success: true, token })
            }
        }
    )
}

const signin = (req, res) => {
    const { email, password } = req.body

    connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (err, result) => {
            if (err) {
                res.status(400).send({
                    success: false,
                    msg: 'Email or password is incorrect',
                })
            } else {
                let status = null

                if (result.length) {
                    status = await bcrypt.compare(password, result[0].password)
                }

                if (status) {
                    const user = {
                        id: result[0].id,
                        fullname: result[0].fullname,
                        email: result[0].email,
                    }

                    const token = jwt.sign(user, process.env.TOKEN_SECRET, {
                        expiresIn: '1h',
                    })

                    res.status(200).send({ success: true, token })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: 'Email or password is incorrect',
                    })
                }
            }
        }
    )
}

const getUserByEmail = async (req, res) => {
    const { email } = req.params

    connection.query(
        'SELECT id, email, fullname FROM users WHERE email = ?',
        [email],
        async (err, result) => {
            if (err) {
                res.status(400).send({
                    success: false,
                    msg: 'User could not found',
                })
            } else {
                if (result.length) {
                    res.status(200).send({ success: true, user: result[0] })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: 'User could not found',
                    })
                }
            }
        }
    )
}

const getLoggedUser = (req, res) => {
    res.status(200).send({ success: true, user: req.user })
}

module.exports = { signup, signin, getUserByEmail, getLoggedUser }
