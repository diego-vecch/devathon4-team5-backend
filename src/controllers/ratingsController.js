const ratingsService = require('../services/ratingsService')

const ratingsCreate = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await ratingsService.ratingsCreate(req)
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

const ratingsRead = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await ratingsService.ratingsRead(req)
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

const ratingsUpdate = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await ratingsService.ratingsUpdate(req)
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

const ratingsDelete = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await ratingsService.ratingsDelete(req)
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

const ratingsPlaceId = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await ratingsService.ratingsPlaceId(req)
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

module.exports = { ratingsCreate, ratingsUpdate, ratingsDelete, ratingsRead, ratingsPlaceId }
