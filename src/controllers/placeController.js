const https = require('https')
require('dotenv').config()

const KEY_GOOGLE_MAPS = process.env.KEY_GOOGLE_MAPS

const accessibilityWheelchair = async (req, res, next) => {
  const { place } = req.body

  const placeId = async (req, res, nex) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&inputtype=textquery&key=${KEY_GOOGLE_MAPS}`
      const resp = await fetch(url)
      const data = await resp.json()
      const id = await data.candidates[0].place_id
      return id
    } catch (error) {
      console.log(error)
    }
  }
  const idplaces = placeId()
  const id = await idplaces
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${KEY_GOOGLE_MAPS}`

  https.get(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
      data += chunk
    })

    response.on('end', () => {
      res.status(200).json(JSON.parse(data))
    })
  }).on('error', () => {
    res.status(500).send('Internal Server Error')
  })
}

module.exports = { accessibilityWheelchair }