require('dotenv').config()
const fetch = require('node-fetch')

const KEY_GOOGLE_MAPS = process.env.KEY_GOOGLE_MAPS

const autocomplete = async (req, res, next) => {
  const { input } = req.body

  const apiUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'

  const response = await fetch(`${apiUrl}?input=${encodeURIComponent(input)}&key=${KEY_GOOGLE_MAPS}`)
  const data = await response.json()

  const predictions = data.predictions
  const description = []

  for (const i in predictions) {
    description.push(predictions[i].description)
  }
  res.status(200).send(description)
}

const maps = async (req, res, next) => {
  const apiKey = KEY_GOOGLE_MAPS
  const { address } = req.body

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Aquí puedes manejar la respuesta de la API
      console.log(data)
      const results = data.results[0]
      return res.send({
        locality: results.formatted_address,
        location: results.geometry.location,
        place_id: results.place_id
      })
    })
    .catch(error => {
      // Aquí puedes manejar cualquier error que ocurra durante la solicitud
      console.error(error)
    })

  
}

module.exports = { autocomplete, maps }
