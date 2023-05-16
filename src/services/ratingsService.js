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
    rating: createdRating
  }

  return createResponse(true, data, null, 201)
}

module.exports = { ratingsCreate }
