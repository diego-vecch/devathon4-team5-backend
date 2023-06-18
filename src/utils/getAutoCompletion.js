const fetch = require('node-fetch')
const lookupHere = require('./lookupHere')
require('dotenv').config()

async function getAutoCompletion (query) {
  const apiKey = process.env.API_KEY_HERE
  const limit = 5

  const url = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${query}&limit=${limit}&apiKey=${apiKey}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Error en la solicitud de autocompletado:', response.status)
    }

    const data = await response.json()
    // Filtrar los resultados y extraer solo la información necesaria

    const resultados = await Promise.all(data.items.map(async (item) => {
      const coordenadas = await lookupHere(item.id)
      return {
        titulo: item.title,
        id: item.id,
        coordenadas
      }
    }))
    return resultados
  } catch (error) {
    console.error('Error al obtener los resultados de autocompletado:', error)
    return []
  }
}

module.exports = getAutoCompletion
