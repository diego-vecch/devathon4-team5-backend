const express = require('express')

const connection = require('./database/db.js')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.send("<h2>Let's Go team five!</h2>")
})

connection()

app.listen(PORT, () => {
  console.log(`el servidor esta corriendo en el puerto ${PORT}`)
})
