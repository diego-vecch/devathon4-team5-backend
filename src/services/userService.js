const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { createResponse } = require('../utils/responseGenarator')
// const { signToken } = require('../utils/jwtOperations')
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

  const { username, email, password } = req.body

  const usernameExists = await User.findOne({ username })

  const emailExists = await User.findOne({ email })

  if (usernameExists || emailExists) {
    return createResponse(false, data, 'Invalid Email/Username usernameExist service', 400)
  }
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

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
module.exports = { userRegister, verifyEmail }
