const express = require('express')
const ratingsController = require('../../controllers/ratingsController')
const { ratingValidator } = require('../../middlewares/validators')

const { tokenValidator } = require('../../middlewares/tokenValidator')

const ratingsRouter = express.Router()

ratingsRouter.route('/create').post(tokenValidator, ratingValidator, ratingsController.ratingsCreate)

ratingsRouter.route('/').get(ratingsController.ratingsRead)

ratingsRouter.route('/update/:id').patch(tokenValidator, ratingsController.ratingsUpdate)

ratingsRouter.route('/delete/:id').delete(tokenValidator, ratingsController.ratingsDelete)

module.exports = ratingsRouter
