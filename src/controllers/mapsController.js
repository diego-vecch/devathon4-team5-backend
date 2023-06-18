// const fetch = require('node-fetch')
const getAutoCompletion = require('../utils/getAutoCompletion')
const getReverseGeocode = require('../utils/getReverseGeocode')

const autocomplete = async (req, res) => {
  const { query } = req.body
  try {
    const opciones = await getAutoCompletion(query)
    res.send(opciones)
  } catch (error) {
    console.log('Error:', error)
    res.sendStatus(500)
  }
}

const dataCoordinate = async (req, res) => {
  const { lat, lng } = req.body

  getReverseGeocode(lat, lng)
    .then((information) => {
      res.send(information)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

module.exports = { autocomplete, dataCoordinate }
