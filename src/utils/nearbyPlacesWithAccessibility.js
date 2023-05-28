
const nearbyPlacesWithAccessibility = async (latitud, longitud, radio, tipoLugar, apiKey) => {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitud},${longitud}&radius=${radio}&type=${tipoLugar}&key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.status === 'OK') {
      const lugares = data.results
      lugares.forEach(lugar => {
        const nombre = lugar.name
        const direccion = lugar.vicinity
        console.log(`Nombre: ${nombre}`)
        console.log(`Dirección: ${direccion}`)
        console.log('---')
      })
    } else {
      console.log('No se pudo completar la solicitud.')
    }
  } catch (error) {
    console.log('Error de conexión:', error)
  }
}

module.exports = nearbyPlacesWithAccessibility
