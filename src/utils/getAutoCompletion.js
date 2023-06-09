const fetch = require('node-fetch')

async function getAutoCompletion (consulta) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(consulta)}`
    const respuesta = await fetch(url)

    // Verificar si la solicitud fue exitosa
    if (respuesta.ok) {
      const opciones = await respuesta.json()
      console.log(opciones)

      // Filtrar las primeras 10 opciones
      const opcionesAutocompletado = opciones.slice(0, 10).map(opcion => {
        return {
          display_name: opcion.display_name,
          lat: opcion.lat,
          lon: opcion.lon,
          type: opcion.type,
          place_id: opcion.place_id
        }
      })

      return opcionesAutocompletado
    } else {
      console.log('Error en la solicitud:', respuesta.status)
      return []
    }
  } catch (error) {
    console.log('Error en la solicitud:', error.message)
    return []
  }
}

module.exports = getAutoCompletion
