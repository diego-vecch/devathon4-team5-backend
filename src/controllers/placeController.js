const fetch = require('node-fetch')
const searchPlaceById = require('../utils/searchPlaceById')
require('dotenv').config()

const KEY_GOOGLE_MAPS = process.env.KEY_GOOGLE_MAPS

const accessibilityWheelchair = async (req, res, next) => {
  const { place } = req.body

  const getPlaceId = async (place) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&inputtype=textquery&key=${KEY_GOOGLE_MAPS}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      const id = data.candidates[0].place_id
      return id
    } catch (error) {
      console.log(error)
      throw new Error('Failed to retrieve place ID')
    }
  }

  try {
    const id = await getPlaceId(place)
    const data = await searchPlaceById(id)

    res.status(200).send({
      success: true,
      data,
      error: null
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      data: null,
      error: 'Internal Server Error'
    })
  }
}

module.exports = { accessibilityWheelchair }
