const jwt = require('jsonwebtoken')

const signToken = (userToken) => {
  return jwt.sign(userToken,
    process.env.JWT_SECRET_KEY,
    { expiresIn: '12h' }
  )
}

const verifyToken = (request) => {
  const authorization = request.headers.authorization?.toLowerCase().startsWith('bearer ')
  const token = authorization ? request.headers.authorization?.split(' ')[1] : null
  const payload = validateToken(token)
  request.userName = payload.name
  request.userId = payload.id
}

const validateToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

module.exports = { signToken, verifyToken }
