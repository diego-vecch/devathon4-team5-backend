const express = require('express')
const userController = require('../../controllers/userController')
const { registroValidator } = require('../../middlewares/validators')
// const tokenValidator = require('../../middlewares/tokenValidator')
//, loginValidator, modifyUserValidator

const userRouter = express.Router()
// Ruta de registro de usuario:
userRouter.route('/users/register').post(registroValidator, userController.userRegister)

// Ruta que verifica el registro:
userRouter.route('/users/verify/:cryptoToken').get(userController.verifyEmail)

module.exports = userRouter
