const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Role = require('../models/Role')
const { createResponse } = require('../utils/responseGenarator')
const { signToken } = require('../utils/jwtOperations')
const { initUserSeguridad, verifyUser } = require('../utils/verificationManager')
const { sendVerificationMail } = require('../utils/emailTransporter')
const buildHostName = require('../utils/hostManager')

const USER_ERROR = 'Error getting user'
//, buildForgotPassword, passwordReset
//, sendForgotPasswordMail, sendChangedPasswordMail

const SALT_ROUNDS = 10

const MSG_NO_VERIFICADO = 'You must verify the account. Check your mail'

const userRegister = async (req) => {
  let data = null

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return createResponse(false, data, errors.array(), 400)
  }

  const { username, email, password, roles } = req.body

  const usernameExists = await User.findOne({ username })

  const emailExists = await User.findOne({ email })

  if (usernameExists || emailExists) {
    return createResponse(false, data, 'Invalid Email/Username usernameExist service', 400)
  }
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  // if (roles) {
  //   const rolesEncontrados = await Role.find({ name: { $in: roles } })
  //   console.log(rolesEncontrados)
  // }

  const userData = req.body
  userData.password = passwordHash
  userData.security = initUserSeguridad()

  const createdUser = await User.create(userData)

  await sendVerificationMail(createdUser, buildHostName(req))

  data = {
    msg: 'Registered successfully. ' + MSG_NO_VERIFICADO,
    id: createdUser._id
  }

  return createResponse(true, data, null, 201)
}

const verifyEmail = async (req) => {
  let data = null
  const { cryptoToken } = req.params

  const userExists = await User.findOne({ 'security.cryptoToken': cryptoToken })

  if (!userExists) {
    return createResponse(false, data, USER_ERROR, 400)
  }

  userExists.security = verifyUser(userExists)

  const userUpdated = await User.update(userExists._id, userExists)

  data = {
    email: userUpdated.email,
    username: userUpdated.username,
    verified: userUpdated.security.verified
  }

  return createResponse(true, data, null, 200)
}

const loginUser = async (req) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return createResponse(false, null, errors.array(), 400)
  }
  // Usuario que solicita login desde el front-end
  const { email, password } = req.body
  // Buscar en la base de datos un usuario con ese email, si existe asignar a la constante userDB
  const userDB = await User.findOne({ email })
  // Si userDB existe:
  if (userDB) {
    // Comprobar que no este iniciado un proceso de cambio de contraseña, si es asi retornar error y solicitar terminar el procedimiento
    if (userDB.security?.restorePassword) {
      return createResponse(false, null, 'A password change has been requested and you must finish the process', 400)
    }

    // Si no esta en proceso de cambio de contraseña comparar las password, si no son iguales retornar un arror
    if (!bcrypt.compareSync(password, userDB.password)) {
      return createResponse(false, null, 'Invalid email o password', 401)
    }

    // Si el usuario no esta verificaco aun retornar error y un mensaje que solicite revisar el email
    if (!userDB.security?.verified) {
      return createResponse(false, null, MSG_NO_VERIFICADO, 400)
    }

    // Si paso las validaciones  crear el jwt token
    const userToken = {
      id: userDB._id,
      name: userDB.name
    }
    const token = signToken(userToken)
    const data = {
      id: userDB._id,
      name: userDB.name,
      username: userDB.username,
      token
    }
    return createResponse(true, data, null, 200)
  }
  return createResponse(false, null, 'Invalid email o password', 401)
}

module.exports = { userRegister, verifyEmail, loginUser }
