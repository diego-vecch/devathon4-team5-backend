const express = require('express')
const cors = require('cors')
const connection = require('./database/db.js')
const { createRoles } = require('./utils/initialSetup.js')
const app = express()
require('dotenv').config()
const userRouter = require('./v1/routes/userRouter.js')
const accessibilityRouter = require('./v1/routes/accessibilityRouter.js')

const PORT = process.env.PORT

app.use(cors())
createRoles()
app.use(express.json())

app.use('/api/v1/users/', userRouter)
app.use('/api/v1/accessibility/', accessibilityRouter)

connection()

app.listen(PORT, () => {
  console.log(`el servidor esta corriendo en el puerto ${PORT}`)
})
