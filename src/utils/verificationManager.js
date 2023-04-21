const crypto = require('crypto')

const initUserSeguridad = () => {
  const cryptoToken = crypto.randomBytes(16).toString('hex')
  const verified = false
  const restorePassword = false

  return { verified, cryptoToken, restorePassword }
}

const verifyUser = (user) => {
  return {
    verified: true,
    cryptoToken: null,
    restorePassword: user.security?.restorePassword
  }
}

const buildForgotPassword = (user) => {
  const cryptoToken = crypto.randomBytes(16).toString('hex')

  return {
    verified: user.security?.verified,
    cryptoToken,
    restorePassword: true
  }
}

const passwordReset = (user) => {
  return {
    verified: user.security?.verified,
    cryptoToken: null,
    restorePassword: false
  }
}

module.exports = { initUserSeguridad, verifyUser, buildForgotPassword, passwordReset }
