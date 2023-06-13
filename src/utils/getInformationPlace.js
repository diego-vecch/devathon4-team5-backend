const fetch = require('node-fetch')

async function getInformationPlace (lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`

  try {
    const answer = await fetch(url)
    const data = await answer.json()
    // Comprueba si se obtuvo una respuesta exitosa
    if (answer.ok) {
      const placeId = data.place_id
      const place = data.display_name
      const address = data.address
      return { placeId, place, address }
    } else {
      throw new Error(data.error || 'Could not get location information')
    }
  } catch (error) {
    throw new Error(`
    Failed to make the request: ${error.message}`)
  }
}

module.exports = getInformationPlace
