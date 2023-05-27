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
  const { userId, body } = req
  let placeId = body.placeId
  const placeIdExists = await verifyExistencePlaceId(placeId, apiKey)
  if (!placeIdExists) {
    return createResponse(false, null, 'Failed to check for the existence of the Place ID', 400)
  }
  let placeIdExistsBBDD = await Place.findOne({ placeId })
  placeId = { placeId }

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
  const { id, page, limit } = req.params
  let data = null

  const options = {
    page: parseInt(page, 3) || 3,
    limit: parseInt(limit, 3) || 3
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
  const ratingEncontrado = ratings.docs

  let totalRating = 0
  const newRating = []

  for (let i = 0; i < ratingEncontrado.length; i++) {
    const valoration = {}
    totalRating += ratingEncontrado[i].rating
    const userId = ratingEncontrado[i].user
    const userName = await getUsername(userId)
    valoration.user = userName
    valoration.rating = (ratingEncontrado[i].rating)
    valoration.comment = (ratingEncontrado[i].comment)

    newRating.push(valoration)
  }

  const promedio = (totalRating / ratingEncontrado.length)
  data = {
    ratings: [newRating],
    averageValue: promedio
  }
  return createResponse(true, data, null, 200)
}

module.exports = { ratingsCreate, ratingsUpdate, ratingsDelete, ratingsRead, ratingsPlaceId }
