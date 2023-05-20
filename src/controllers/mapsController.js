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
    const respuesta = {
      locality: results.formatted_address,
      location: results.geometry.location,
      place_id: results.place_id
    }
    return respuesta
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
    const prueba = (predictions[i].description)
    description.push(await maps(prueba))
  }

  res.status(200).send(description)
}

module.exports = { autocomplete }
