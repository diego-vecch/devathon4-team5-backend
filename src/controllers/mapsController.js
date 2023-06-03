// const fetch = require('node-fetch')
const getAutoCompletion = require('../utils/getAutoCompletion')
const getNearbyPlaces = require('../utils/getNearbyPlaces')

const autocomplete = async (req, res) => {
  const { input } = req.body
  try {
    const opciones = await getAutoCompletion(input)
    res.send(opciones)
  } catch (error) {
    console.log('Error:', error)
    res.sendStatus(500)
  }
}

const nearbyPlaces = async (req, res) => {
  const { radio, lat, lng } = req.body
  try {
    const lugares = await getNearbyPlaces(radio, lat, lng)
    console.log(lugares)
    res.send(lugares)
  } catch (error) {
    console.log('Error:', error)
    res.sendStatus(500)
  }
}

module.exports = { autocomplete, nearbyPlaces }
