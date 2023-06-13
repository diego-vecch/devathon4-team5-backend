// const fetch = require('node-fetch')
const getAutoCompletion = require('../utils/getAutoCompletion')
const getInformationPlace = require('../utils/gtInformationPlace')

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

const dataCoordinate = async (req, res) => {
  const { lat, lon } = req.body

  getInformationPlace(lat, lon)
    .then((information) => {
      res.send(information)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

module.exports = { autocomplete, dataCoordinate }
