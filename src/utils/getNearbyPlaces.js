const fetch = require('node-fetch')

async function getNearbyPlaces (radio, lat, lng) {
  try {
    const url = `https://lz4.overpass-api.de/api/interpreter?data=[out:json];node(around:${radio},${lat},${lng});out;`
    const respuesta = await fetch(url)

    // Verificar si la solicitud fue exitosa
    if (respuesta.ok) {
      const resultado = await respuesta.json()
      const lugaresCercanos = resultado.elements
      return lugaresCercanos
    } else {
      console.log('Error en la solicitud:', respuesta.status)
      return []
    }
  } catch (error) {
    console.log('Error en la solicitud:', error.message)
    return []
  }
}

module.exports = getNearbyPlaces
