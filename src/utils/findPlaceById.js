const osmium = require('node-osmium')

function findPlaceById (osmFilePath, placeId) {
  const reader = new osmium.Reader(osmFilePath)
  const handler = new osmium.Handler()

  // Definir una función de manejo de nodos
  handler.on('node', (node) => {
    if (node.id === placeId) {
      console.log('Lugar encontrado:')
      console.log(node)
    }
  })

  // Definir una función de manejo de relaciones
  handler.on('relation', (relation) => {
    if (relation.id === placeId) {
      console.log('Lugar encontrado:')
      console.log(relation)
    }
  })

  // Definir una función de manejo de caminos
  handler.on('way', (way) => {
    if (way.id === placeId) {
      console.log('Lugar encontrado:')
      console.log(way)
    }
  })

  // Procesar el archivo OSM
  osmium.apply(reader, handler)
}

// Ejemplo de uso
const osmFilePath = 'map.osm' // Ruta al archivo OSM
const placeId = 123456 // ID del lugar que deseas buscar

findPlaceById(osmFilePath, placeId)
