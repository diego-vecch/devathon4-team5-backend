const express = require('express')
const cors = require('cors')
const connection = require('./database/db.js')
// const { createRoles } = require('./utils/initialSetup.js')
const app = express()
require('dotenv').config()
const userRouter = require('./v1/routes/userRouter.js')
const ratingsRouter = require('./v1/routes/ratingsRouter.js')
const mapsRouter = require('./v1/routes/mapsRouter.js')
const placeRouter = require('./v1/routes/placeRoutes.js')

const PORT = process.env.PORT

app.use(cors())
// createRoles()
app.use(express.json())

app.use('/api/v1/users/', userRouter)
app.use('/api/v1/maps/', mapsRouter)
app.use('/api/v1/places/', placeRouter)
app.use('/api/v1/ratings/', ratingsRouter)

connection()

app.listen(PORT, () => {
  console.log(`el servidor esta corriendo en el puerto ${PORT}`)
})
