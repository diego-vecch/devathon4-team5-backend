const express = require('express')
const mapsController = require('../../controllers/mapsController')

// const { tokenValidator } = require('../../middlewares/tokenValidator')

const mapsRouter = express.Router()

mapsRouter.route('/autocomplete').post(mapsController.autocomplete)
mapsRouter.route('/data-coordinates').post(mapsController.coordinates)
mapsRouter.route('/nearby-places-with-accessibility').post(mapsController.nearbyPlacesWithAccessibility)

module.exports = mapsRouter
