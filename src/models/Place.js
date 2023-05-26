const { Schema, model } = require('mongoose')

const placeSchema = new Schema({
  placeId: {
    type: String,
    required: true
  },
  rating: [{
    type: Schema.Types.ObjectId,
    ref: 'Rating'
  }]
},
{ timestamps: true })

placeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
  }
})

const Place = model('Place', placeSchema)

const findOne = async (data) => {
  return await Place.findOne(data)
}

const findById = async (id) => {
  return await Place.findById(id)
}

const create = async (newPlaceData) => {
  const newPlace = new Place(newPlaceData)

  const savedPlace = await newPlace.save()
  return savedPlace
}

const deletePlace = async (data) => {
  return await Place.deleteOne(data)
}

const findByIdAndUpdate = async (id, newPlaceData) => {
  return await Place.findByIdAndUpdate(id, newPlaceData, { new: true })
}
const saveRatingIntoPlace = async (rating, place) => {
  place.ratings = place.ratings.concat(rating._id)
  await rating.save()
}

module.exports = { findOne, findById, create, findByIdAndUpdate, deletePlace, saveRatingIntoPlace }
