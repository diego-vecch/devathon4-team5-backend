const express = require('express')
const contactController = require('../../controllers/contactController')

// const { tokenValidator } = require('../../middlewares/tokenValidator')

const contactRouter = express.Router()

contactRouter.route('/contact').post(contactController.contact)

module.exports = contactRouter