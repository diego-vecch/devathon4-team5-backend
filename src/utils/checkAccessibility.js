const fetch = require('node-fetch')

async function checkAccessibility (lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&extratags=1`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    // Verificar si la respuesta contiene información sobre la accesibilidad
    if (data && data.address && data.address.wheelchair) {
      const accessibility = data.address.wheelchair
      return accessibility
    }

    return 'No se encontró información sobre la accesibilidad.'
  } catch (error) {
    console.error('Error al obtener información de OpenStreetMap:', error)
    throw error
  }
}

module.exports = checkAccessibility