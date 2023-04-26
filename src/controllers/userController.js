const userService = require('../services/userService')

const userRegister = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await userService.userRegister(req)
    const response = {
      success,
      data,
      errorMsg
    }
    res.status(statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const verifyEmail = async (req, res, next) => {
  try {
    const { success } = await userService.verifyEmail(req)
    if (success === true) {
      res.redirect(process.env.URL_SIGNIN)
    } else {
      res.redirect(process.env.URL_REGISTER)
    }
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await userService.loginUser(req)
    const response = {
      success,
      data,
      errorMsg
    }
    res.status(statusCode).json(response)
  } catch (error) {
    next(error)
  }
}
module.exports = { userRegister, verifyEmail, loginUser }
