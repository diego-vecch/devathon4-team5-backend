const { Schema, model, version } = require('mongoose')

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
    ref: 'Ratings'
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

module.exports = { findOne, findById, create, update }
