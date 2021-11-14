const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

require('./database/migrations')

app.use(cors())
app.use(express.json())

const userRoutes = require('./routes/users')
app.use('/user', userRoutes)

const taskRoutes = require('./routes/tasks')
app.use('/task', taskRoutes)

module.exports = app
