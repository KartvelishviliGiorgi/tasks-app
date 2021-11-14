const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    let token

    if (req.headers.token) {
        token = req.headers.token
    }

    if (!token) {
        return res
            .status(500)
            .send({ success: false, msg: 'Not authorized to accses this.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        const user = {
            id: decoded.id,
            fullname: decoded.fullname,
            email: decoded.email,
        }

        req.user = user

        next()
    } catch (err) {
        return res.status(500).send({ success: false, msg: err.message })
    }
}

module.exports = verifyToken
