const { validationResult } = require('express-validator')
const Rating = require('../models/Rating')
const User = require('../models/User')
const { createResponse } = require('../utils/responseGenarator')

const USER_ERROR = 'Error getting user'

const ratingsCreate = async (req) => {
  let data = null

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return createResponse(false, data, errors.array(), 400)
  }

  const { userId, body } = req

  const userExists = await User.findById(userId)

  if (!userExists) {
    return createResponse(false, data, USER_ERROR, 400)
  }

  body.user = userExists._id
  const createdRating = await Rating.create(body)

  await User.saveRatingIntoUser(createdRating, userExists)

  data = {
    id: createdRating.id,
    rating: createdRating
  }

  return createResponse(true, data, null, 201)
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
module.exports = { ratingsCreate, ratingsUpdate }
