const express = require('express')
const userController = require('../../controllers/userController')
const { registroValidator, loginValidator } = require('../../middlewares/validators')

const { tokenValidator, isModerator } = require('../../middlewares/tokenValidator')
//, modifyUserValidator

const userRouter = express.Router()
// Ruta de registro de usuario:
/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: User registration
 *     description: Endpoint for user registration.
 *     parameters:
 *       - name: name
 *         in: formData
 *         description: User's name
 *         required: true
 *         type: string
 *       - name: username
 *         in: formData
 *         description: Username
 *         required: true
 *         type: string
 *       - name: email
 *         in: formData
 *         description: Email address
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: Password
 *         required: true
 *         type: string
 *       - name: roles
 *         in: formData
 *         description: User roles
 *         required: false
 *         type: string
 *         default: user
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

userRouter.route('/register').post(registroValidator, userController.userRegister)

// Ruta que verifica el registro:
userRouter.route('/verify/:cryptoToken').get(userController.verifyEmail)

// Ruta de login:
/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: User login
 *     description: Endpoint for user login.
 *     parameters:
 *       - name: username
 *         in: formData
 *         description: Username
 *         required: false
 *         type: string
 *       - name: password
 *         in: formData
 *         description: Password
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

userRouter.route('/login').post(loginValidator, userController.loginUser)

// Ruta de prueba
userRouter.get('/prueba', [tokenValidator, isModerator], userController.userList)
module.exports = userRouter
