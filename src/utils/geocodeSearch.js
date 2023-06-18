const fetch = require('node-fetch')

async function geocodeSearch (query) {
  const apiKey = 'l-5L4-vYrhzQ4sQ2lncqE1mh_24L0Gmh-zkpbkaeVVY'
  const url = `https://geocode.search.hereapi.com/v1/geocode?q=${query}&apiKey=${apiKey}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Error en la solicitud de geocodificación:', response.status)
    }

    const data = await response.json()
    const resultados = data.items.map(item => ({
      title: item.title,
      id: item.id,
      position: item.position
    }))

    return resultados
  } catch (error) {
    console.error('Error al obtener la geocodificación:', error)
    return []
  }
}

module.exports = geocodeSearch
