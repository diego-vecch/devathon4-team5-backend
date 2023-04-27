const express = require('express')

const connection = require('./database/db.js')
const { createRoles } = require('./utils/initialSetup.js')
const app = express()
require('dotenv').config()
const userRouter = require('./v1/routes/userRouter.js')

const PORT = process.env.PORT
createRoles()
app.use(express.json())

app.use('/api/v1/users/', userRouter)

connection()

app.listen(PORT, () => {
  console.log(`el servidor esta corriendo en el puerto ${PORT}`)
})
