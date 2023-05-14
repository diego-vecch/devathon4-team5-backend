const { validationResult } = require('express-validator')
const Ratings = require('../models/Rating')
const User = require('../models/User')
// const Role = require('../models/Role')
const { createResponse } = require('../utils/responseGenarator')
const { signToken } = require('../utils/jwtOperations')
const { initUserSeguridad, verifyUser } = require('../utils/verificationManager')
const { sendVerificationMail } = require('../utils/emailTransporter')
const buildHostName = require('../utils/hostManager')

const USER_ERROR = 'Error getting user'

const ratingsCreate = async (req) => {
    let data = null

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return createResponse(false, data, errors.array(), 400)
    }

    const { userId, body } = req
    console.log(userId)
    console.log(body)

    const userExists = await User.findById(userId)
    console.log (userExists)

    if (!userExists) {
        return createResponse(false, data, USER_ERROR, 400)
    }

    body.user = userExists._id
    const createdRatings = await Rating.createRating(body)

    await User.saveRatingIntoUser(createdRating, userExists)

    data = {
        rating: createdRating
    }

    return createResponse(true, data, null, 201)
}

module.exports = { ratingsCreate }