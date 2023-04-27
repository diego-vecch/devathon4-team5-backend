const { verifyToken } = require('../utils/jwtOperations')
const User = require('../models/User')
// const Role = require('../models/Role')

const tokenValidator = (request, response, next) => {
  try {
    verifyToken(request)
    next()
  } catch (error) {
    next(error)
  }
}

const isModerator = async (request, response, next) => {
  try {
    const user = await User.findById(request.userId)

    if (user.roles === 'moderator') {
      next()
    } else {
      return response.status(403).send({ msg: 'Error forbidden, You do not have the necessary permissions' })
    }
  } catch {
    response.status(500).send({ msg: 'error' })
  }
}

const isAdmim = async (request, response, next) => {
  try {
    const user = await User.findById(request.userId)

    if (user.roles === 'admin') {
      next()
    } else {
      return response.status(403).send({ msg: 'Error forbidden, You do not have the necessary permissions' })
    }
  } catch {
    response.status(500).send({ msg: 'error' })
  }
}

module.exports = { tokenValidator, isModerator, isAdmim }
