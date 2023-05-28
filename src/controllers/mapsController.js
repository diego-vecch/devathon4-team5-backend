require('dotenv').config()
const fetch = require('node-fetch')
const searchPlaceById = require('../utils/searchPlaceById')
const checkAccessibilityWheelchair = require('../utils/checkAccessibilityWheelchair')

const KEY_GOOGLE_MAPS = process.env.KEY_GOOGLE_MAPS

async function maps (address) {
  const apiKey = KEY_GOOGLE_MAPS
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    const results = data.results[0]
    const locationData = {
      locality: results.formatted_address,
      location: results.geometry.location,
      place_id: results.place_id
    }
    return locationData
  } catch (error) {
    console.error(error)
  }
}

const autocomplete = async (req, res, next) => {
  const { input } = req.body

  const apiUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'

  const response = await fetch(`${apiUrl}?input=${encodeURIComponent(input)}&key=${KEY_GOOGLE_MAPS}`)
  const data = await response.json()

  const predictions = data.predictions
  const description = []

  for (const i in predictions) {
    const address = (predictions[i].description)
    description.push(await maps(address))
  }

  res.status(200).send(description)
}
async function dataCoordinates (req, res, next) {
  const { lat, lng } = req.body

  let data = null
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${KEY_GOOGLE_MAPS}`

  try {
    const answer = await fetch(url)
    const information = await answer.json()

    if (information.status === 'OK') {
      const results = information.results
      const address = results[0].formatted_address
      const placeId = results[0].place_id

      data = {
        address, placeId
      }
      res.status(200).send(data)
    } else {
      return 'Could not get information for the specified coordinates.'
    }
  } catch (error) {
    return 'Error getting information.'
  }
}

const coordinates = async (req, res, next) => {
  const { lat, lng } = req.body

  const getPlaceId = async (lat, lng) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${KEY_GOOGLE_MAPS}`
      const response = await fetch(url)
      const data = await response.json()
      const id = (data.results[0].place_id)
      return id
    } catch (error) {
      throw new Error('Failed to retrieve place ID')
    }
  }

  try {
    const id = await getPlaceId(lat, lng)
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

const nearbyPlacesWithAccessibility = async (req, res) => {
  try {
    const { lat, lng, radio, type } = req.body
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radio}&type=${type}&key=${KEY_GOOGLE_MAPS}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status === 'OK') {
      const places = data.results
      const results = await Promise.all(places.map(async (place) => {
        const placeData = {}
        placeData.name = place.name
        placeData.vicinity = place.vicinity
        placeData.place_id = place.place_id
        const isWheelchairAccessible = await checkAccessibilityWheelchair(place.place_id)
        placeData.accessibility = isWheelchairAccessible
        placeData.location = place.geometry.location
        return placeData
      }))
      res.status(200).send(results)
    } else {
      console.log('The request could not be completed.')
      res.sendStatus(500)
    }
  } catch (error) {
    console.log('Connection error:', error)
    res.sendStatus(500)
  }
}

module.exports = { autocomplete, dataCoordinates, coordinates, nearbyPlacesWithAccessibility }
