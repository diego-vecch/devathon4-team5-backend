// const fetch = require('node-fetch')
const getAutoCompletion = require('../utils/getAutoCompletion')

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

module.exports = { autocomplete }
