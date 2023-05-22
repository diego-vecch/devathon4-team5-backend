const express = require('express')
const placeController = require('../../controllers/placeController')

// const { tokenValidator } = require('../../middlewares/tokenValidator')

const mapsRouter = express.Router()

mapsRouter.route('/assessibility-wheelchair').post(placeController.assessibilityWheelchair)

module.exports = mapsRouter
