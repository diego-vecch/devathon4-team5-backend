const express = require('express')
const mapsController = require('../../controllers/mapsController')

// const { tokenValidator } = require('../../middlewares/tokenValidator')

const mapsRouter = express.Router()

mapsRouter.route('/autocomplete').post(mapsController.autocomplete)

module.exports = mapsRouter
