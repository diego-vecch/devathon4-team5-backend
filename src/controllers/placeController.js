const wheelchair = require('../utils/wheelchair')
const searchPlaceById = require('../utils/searchPlaceById')

const wheelchairAccessibilityController = async (req, res) => {
  const { lat, lng, accuracy } = req.body

  try {
    const opciones = await wheelchair(lat, lng, accuracy)
    res.send(opciones)
  } catch (error) {
    console.log('Error:', error)
    res.sendStatus(500)
  }
}

const searchPlaceByIdController = async (req, res) => {
  const { id } = req.body

  try {
    const opciones = await searchPlaceById(id)
    res.send(opciones)
  } catch (error) {
    console.log('Error:', error)
    res.sendStatus(500)
  }
}

module.exports = { wheelchairAccessibilityController, searchPlaceByIdController }
