const express = require('express')
const ratingsController = require ('../../controllers/ratingsController')
// const userController = require('../../controllers/userController')
// const { registroValidator, loginValidator } = require('../../middlewares/validators')

// const { tokenValidator, isModerator } = require('../../middlewares/tokenValidator')
//, modifyUserValidator

const ratingsRouter = express.Router()
// Ruta de registro de usuario:
ratingsRouter.route('/create').post(ratingsController.ratingsCreate)

// // Ruta que verifica el registro:
// userRouter.route('/verify/:cryptoToken').get(ratingsController.verifyEmail)

// // Ruta de login:
// userRouter.route('/login').post(loginValidator, ratingsController.loginUser)

module.exports = ratingsRouter