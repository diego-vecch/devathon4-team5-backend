const express = require('express')
const placeController = require('../../controllers/placeController')

const mapsRouter = express.Router()

mapsRouter.route('/accessibility-wheelchair').post(placeController.accessibilityWheelchair)

module.exports = mapsRouter
