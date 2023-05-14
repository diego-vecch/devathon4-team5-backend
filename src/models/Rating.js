const { Schema, model, version } = require('mongoose')

const ratingSchema = Schema({
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: false
  },
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  place: [{
    type: Schema.Types.ObjectId,
    ref: 'Place'
  }]

})

ratingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.password
    delete returnedObject._id
  }
})

const Rating = model('Rating', ratingSchema)

const findOne = async (data) => {
  return await Rating.findOne(data)
}

const findById = async (id) => {
  return await Rating.findById(id)
}

const create = async (newRatingData) => {
  const newRating = new Rating(newRatingData)

  const rating = await newRating.save()
  return rating
}

const update = async (id, newRatingData) => {
  return await Rating.findByIdAndUpdate(id, newRatingData, { new: true })
}

module.exports = { findOne, findById, create, update }
