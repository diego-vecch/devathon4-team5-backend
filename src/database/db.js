const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
require('dotenv').config()

const BBDD_URI = process.env.URL_MONGO

const connection = async () => {
  try {
    mongoose.connect(BBDD_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('connect to database')
  } catch (error) {
    console.log(error)
    throw new Error('could not connect to database')
  }
}

module.exports = connection
