const { verifyToken } = require('../utils/jwtOperations')

const tokenValidator = (request, response, next) => {
  try {
    verifyToken(request)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = tokenValidator
