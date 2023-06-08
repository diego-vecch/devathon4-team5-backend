const fetch = require('node-fetch')

async function getCoordinatesById (placeId) {
  const nominatimUrl = `https://nominatim.openstreetmap.org/details.php?place_id=${placeId}&format=json`

  try {
    const response = await fetch(nominatimUrl)
    const data = await response.json()

    if (data && data.lat && data.lon) {
      const latitude = parseFloat(data.lat)
      const longitude = parseFloat(data.lon)

      // Aquí puedes utilizar las coordenadas
      console.log('Coordenadas:', latitude, longitude)
    } else {
      console.log('No se encontraron coordenadas para el ID especificado.')
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
  }
}

// Ejemplo de uso
// const placeId = 123456789 // ID del lugar que deseas obtener las coordenadas

module.exports = getCoordinatesById
