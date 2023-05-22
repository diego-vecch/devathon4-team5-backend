require('dotenv').config()
const fetch = require('node-fetch')

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

module.exports = { autocomplete, dataCoordinates }
