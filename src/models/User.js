const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: String,
    default: 'user'
  },
  security: {
    verified: Boolean,
    cryptoToken: String,
    restorePassword: Boolean
  },
  ratings: [{
    type: Schema.Types.ObjectId,
    ref: 'Rating'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments'
  }],

  location: [{
    type: Schema.Types.ObjectId,
    ref: 'Location'
  }]

})
userSchema.plugin(mongoosePaginate)
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.password
    delete returnedObject._id
  }
})

const User = model('User', userSchema)

const findOne = async (data) => {
  return await User.findOne(data)
}

const findById = async (id) => {
  return await User.findById(id)
}

const create = async (newUserData) => {
  const newUser = new User(newUserData)

  const user = await newUser.save()
  return user
}

const update = async (id, newUserData) => {
  return await User.findByIdAndUpdate(id, newUserData, { new: true })
}

const saveRatingIntoUser = async (rating, user) => {
  user.ratings = user.ratings.concat(rating._id)
  await rating.save()
}

module.exports = { findOne, findById, create, update, saveRatingIntoUser }
