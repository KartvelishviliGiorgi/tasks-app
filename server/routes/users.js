const express = require('express')
const router = express.Router()

const userController = require('../controllers/users')
const auth = require('../middleware/auth')

router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
router.get('/find/:email', userController.getUserByEmail)
router.get('/logged', auth, userController.getLoggedUser)

module.exports = router
