const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ratingSchema = mongoose.Schema({
  placeId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
    // required: true
  }
},
{ timestamps: true })

ratingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
  }
})

ratingSchema.plugin(mongoosePaginate)
const Rating = mongoose.model('Rating', ratingSchema)

const find = async (data) => {
  return await Rating.find(data)
}

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

const deleteRating = async (data) => {
  return await Rating.deleteOne(data)
}

const paginate = async (page, limit) => {
  return await Rating.paginate(page, limit)
}

const findByIdAndUpdate = async (id, newRatingData) => {
  return await Rating.findByIdAndUpdate(id, newRatingData, { new: true })
}

module.exports = { find, findOne, findById, create, findByIdAndUpdate, deleteRating, paginate }
