const { validationResult } = require('express-validator')
// const mongoosePaginate = require('mongoose-paginate-v2')
const Rating = require('../models/Rating')
const User = require('../models/User')
const Place = require('../models/Place')
const { createResponse } = require('../utils/responseGenarator')
const verifyExistencePlaceId = require('../utils/verifyExistencePlaceId')
require('dotenv').config()
const apiKey = process.env.KEY_GOOGLE_MAPS
const USER_ERROR = 'Error getting user'

const ratingsCreate = async (req, res, next) => {
  try {
    const { userId, body } = req
    const { placeId } = body

    // Verificar existencia de placeId
    const placeIdExists = await verifyExistencePlaceId(placeId, apiKey)
    if (!placeIdExists) {
      return createResponse(false, null, 'Failed to check for the existence of the Place ID', 400)
    }

    // Comprobar si placeId existe en la base de datos
    let place = await Place.findOne({ placeId })
    if (!place) {
      place = await Place.create({ placeId })
    }

    // Validar errores
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return createResponse(false, null, errors.array(), 400)
    }

    // Comprobar si el usuario existe
    const user = await User.findById(userId)
    if (!user) {
      return createResponse(false, null, USER_ERROR, 400)
    }

    // Comprobar si la valoración ya existe
    const ratingExists = await Rating.findOne({ place: place._id, user: userId })
    if (ratingExists) {
      return createResponse(false, null, 'Error creating rating', 401)
    }

    // Crear la valoración
    const createdRating = await Rating.create({ ...body, user: user._id, place: place._id })

    // Guardar la valoración en el usuario
    await User.saveRatingIntoUser(createdRating, user)

    const data = {
      id: createdRating.id,
      rating: createdRating
    }

    return createResponse(true, data, null, 201)
  } catch (error) {
    // Manejar errores
    return createResponse(false, null, 'An error occurred', 500)
  }
}

const ratingsRead = async (req) => {
  let data = null

  const ratings = await Rating.find()
  data = {
    ratings
  }
  return createResponse(true, data, null, 200)
}

const ratingsUpdate = async (req) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return createResponse(false, null, errors.array(), 400)
  }
  const { userId } = req
  const id = req.params.id

  const ratingExists = await Rating.findOne({ _id: id, user: userId })

  if (!ratingExists) {
    return createResponse(false, null, 'Error rating not found', 401)
  }

  const { rating, comment } = req.body
  ratingExists.rating = rating || ratingExists.rating
  ratingExists.comment = comment || ratingExists.comment
  const ratingUpdate = await Rating.findByIdAndUpdate(id, ratingExists)
  const data = {
    id: ratingUpdate.id,
    rating: ratingUpdate
  }

  return createResponse(true, data, null, 200)
}

const ratingsDelete = async (req) => {
  let data = null
  const { userId, params } = req
  const { id } = params

  const ratingsDeleted = await Rating.deleteRating({ _id: id, user: userId })

  if (!ratingsDeleted.deletedCount) {
    return createResponse(false, data, 'Error ratings not found', 400)
  }
  data = {
    userId
  }

  return createResponse(true, data, null, 200)
}

const ratingsPlaceId = async (req) => {
  const { id, page, limit } = req.params
  let data = null

  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(limit, 10) || 3
  }

  const ratings = await Rating.paginate({ placeId: id }, options)

  const getUsername = async (userId) => {
    try {
      const user = await User.findById(userId)
      if (user) {
        return user.username
      }
    } catch (err) {
      console.error(err)
    }
    return null
  }

  const newRating = await Promise.all(ratings.docs.map(async (ratingDoc) => {
    const valoration = {}
    const userId = ratingDoc.user
    const userName = await getUsername(userId)
    valoration.user = userName
    valoration.rating = ratingDoc.rating
    valoration.comment = ratingDoc.comment

    return valoration
  }))

  const ratingsAverage = await Rating.find({ placeId: id })
  const totalRating = ratingsAverage.reduce((acc, curr) => acc + curr.rating, 0)
  const average = totalRating / ratingsAverage.length

  data = {
    ratings: newRating,
    averageValue: average,
    totalPages: ratings.totalPages,
    currentPage: ratings.page,
    hasNextPage: ratings.hasNextPage,
    hasPrevPage: ratings.hasPrevPage
  }
  return createResponse(true, data, null, 200)
}

module.exports = { ratingsCreate, ratingsUpdate, ratingsDelete, ratingsRead, ratingsPlaceId }
