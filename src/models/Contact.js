const { model, Schema } = require('mongoose')

const contactSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
},
  { timestamps: true })

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

const Contact = model('Contact', contactSchema)

const create = async (newContactData) => {
  const newContact = new Contact(newContactData)

  const Contact = await newContact.save()
  return contact
}

const find = async (data) => {
  return await Contact.find(data)
}

const findOne = async (data) => {
  return await Contact.findOne(data)
}

const findById = async (id) => {
  const contact = await Contact.findById(id)
  return contact
}
const findByIdAndUpdate = async (id, newContactData) => {
  return await Contact.findByIdAndUpdate(id, newContactData, { new: true })
}

const deleteOne = async (data) => {
  return await Contact.deleteOne(data)
}

module.exports = { create, find, findOne, findById, findByIdAndUpdate, deleteOne }