const { validationResult } = require('express-validator')
const Rating = require('../models/Rating')
const User = require('../models/User')
const Place = require('../models/Place')
const { createResponse } = require('../utils/responseGenarator')
const verifyExistencePlaceId = require('../utils/verifyExistencePlaceId')
require('dotenv').config()

const apiKey = process.env.KEY_GOOGLE_MAPS

const USER_ERROR = 'Error getting user'

const ratingsCreate = async (req, res, next) => {
  const { userId, body } = req
  let placeId = body.placeId
  // Comprobar que el place id existe en google llamando a la funcion vverifyExistencePlaceId de Utils
  const placeIdExists = await verifyExistencePlaceId(placeId, apiKey)
  if (!placeIdExists) {
    return createResponse(false, null, 'Failed to check for the existence of the Place ID', 400)
  }
  // Comprobar que si ya existe un un lugar con ese place id en nuestra base de datos
  let placeIdExistsBBDD = await Place.findOne({ placeId })
  placeId = { placeId }

  // Si no existe en nuetra base de datos crear el lugar
  if (!placeIdExistsBBDD) {
    placeIdExistsBBDD = await Place.create(placeId)
  }
  let data = null

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return createResponse(false, data, errors.array(), 400)
  }

  const userExists = await User.findById(userId)

  if (!userExists) {
    return createResponse(false, data, USER_ERROR, 400)
  }

  body.user = userExists._id

  body.place = placeIdExistsBBDD._id

  const createdRating = await Rating.create(body)

  await User.saveRatingIntoUser(createdRating, userExists)

  data = {
    id: createdRating.id,
    rating: createdRating
  }

  return createResponse(true, data, null, 201)
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
  const { id } = req.params
  let data = null

  const ratings = await Rating.find({ placeId: id })
  data = {
    ratings
  }
  return createResponse(true, data, null, 200)
}

module.exports = { ratingsCreate, ratingsUpdate, ratingsDelete, ratingsRead, ratingsPlaceId }
