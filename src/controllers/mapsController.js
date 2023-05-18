require('dotenv').config()

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

module.exports = { autocomplete }
