const fetch = require('node-fetch')

async function verifyExistencePlaceId (placeId, apiKey) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.status === 'OK') {
      // El Place ID existe
      return true
    } else if (data.status === 'ZERO_RESULTS') {
      // El Place ID no existe
      return false
    } else {
      // Ocurrió un error
      console.error('Failed to check for the existence of the Place ID', data.error_message)
      return null
    }
  } catch (error) {
    console.error('Failed to make the request:', error)
    return null
  }
}
module.exports = verifyExistencePlaceId
