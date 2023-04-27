const express = require('express')
const userController = require('../../controllers/userController')
const { registroValidator, loginValidator } = require('../../middlewares/validators')

const { tokenValidator, isModerator } = require('../../middlewares/tokenValidator')
//, modifyUserValidator

const userRouter = express.Router()
// Ruta de registro de usuario:
userRouter.route('/register').post(registroValidator, userController.userRegister)

// Ruta que verifica el registro:
userRouter.route('/verify/:cryptoToken').get(userController.verifyEmail)

// Ruta de login:
userRouter.route('/login').post(loginValidator, userController.loginUser)

// Ruta de prueba
userRouter.get('/prueba', [tokenValidator, isModerator], userController.userList)
module.exports = userRouter
