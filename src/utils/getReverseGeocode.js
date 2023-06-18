
const fetch = require('node-fetch')

async function getReverseGeocode (lat, lng) {
  const apiKey = 'l-5L4-vYrhzQ4sQ2lncqE1mh_24L0Gmh-zkpbkaeVVY'
  const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${lng}&lang=en-US&apiKey=${apiKey}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Error en la solicitud de reverse geocode:', response.status)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al obtener el reverse geocode:', error)
    return null
  }
}

module.exports = getReverseGeocode
