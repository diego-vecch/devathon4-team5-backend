const contactController = require('../services/contactService')

const contact = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await contactController.contact(req)
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

module.exports = { contact }