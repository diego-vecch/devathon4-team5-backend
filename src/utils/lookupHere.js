const fetch = require('node-fetch')

async function lookupHere (id) {
  const apiKey = 'l-5L4-vYrhzQ4sQ2lncqE1mh_24L0Gmh-zkpbkaeVVY'
  const url = `https://lookup.search.hereapi.com/v1/lookup?id=${id}&apiKey=${apiKey}`

  try {
    const respuesta = await fetch(url)
    const datos = await respuesta.json()

    // Extraer las coordenadas de la respuesta JSON
    const coordenadas = datos.position

    // Imprimir las coordenadas
    return coordenadas
  } catch (error) {
    console.log('Error al obtener las coordenadas:', error)
  }
}

// Llamar a la función para obtener las coordenadas
lookupHere('here:pds:place:276u0vhj-b0bace6448ae4b0fbc1d5e323998a7d2')

module.exports = lookupHere
