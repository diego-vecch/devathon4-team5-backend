// const axios = require('axios')

// async function obtenerAccesibilidadSillaDeRuedas (req, res) {
//   try {
//     const { lat, lon } = req.body

//     // Realizar una solicitud GET a la API de Nominatim
//     const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
//       params: {
//         lat,
//         lon,
//         format: 'json',
//         addressdetails: 1
//       }
//     })

//     // Verificar si se encontraron resultados
//     if (!response.data.address) {
//       return res.status(404).json({ error: 'No se encontraron resultados para las coordenadas especificadas.' })
//     }

//     // Obtener los detalles del resultado
//     console.log(response.data)
//     const addressDetails = response.data.address

//     // Verificar la accesibilidad para silla de ruedas
//     if (addressDetails.wheelchair === 'yes') {
//       return res.json({ accesibilidad: 'Accesible para silla de ruedas' })
//     } else if (addressDetails.wheelchair === 'limited') {
//       return res.json({ accesibilidad: 'Accesibilidad limitada para silla de ruedas' })
//     } else {
//       return res.json({ accesibilidad: 'No accesible para silla de ruedas' })
//     }
//   } catch (error) {
//     console.error('Ocurrió un error al obtener la accesibilidad:', error)
//     return res.status(500).json({ error: 'Error al obtener la accesibilidad.' })
//   }
// }

// async function obtenerAccesibilidad (req, res) {
//   try {
//     const { lat, lon } = req.body

//     // Realizar una solicitud GET a la API de Nominatim
//     const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
//       params: {
//         lat,
//         lon,
//         format: 'json',
//         addressdetails: 1
//       }
//     })

//     // Verificar si se encontraron resultados
//     if (!response.data.address) {
//       return res.status(404).json({ error: 'No se encontraron resultados para las coordenadas especificadas.' })
//     }

//     // Obtener los detalles del resultado
//     console.log(response)
//     const addressDetails = response.data.address

//     // Verificar la accesibilidad para silla de ruedas
//     if (addressDetails.wheelchair === 'yes') {
//       return res.json({ accesibilidad: 'Accesible para silla de ruedas' })
//     } else if (addressDetails.wheelchair === 'limited') {
//       return res.json({ accesibilidad: 'Accesibilidad limitada para silla de ruedas' })
//     } else {
//       return res.json({ accesibilidad: 'No accesible para silla de ruedas' })
//     }
//   } catch (error) {
//     console.error('Ocurrió un error al obtener la accesibilidad:', error)
//     return res.status(500).json({ error: 'Error al obtener la accesibilidad.' })
//   }
// }

// async function obtenerInformacionAccesibilidad (req, res) {
//   try {
//     const { lat, lon } = req.body
//     console.log(lat, lon)

//     // Realizar una solicitud GET a la API de OpenStreetMap
//     const response = await axios.get(`https://www.openstreetmap.org/api/0.6/map?bbox=${lon - 0.001},${lat - 0.001},${lon + 0.001},${lat + 0.001}`)

//     // Verificar si se encontraron resultados
//     if (!response.data) {
//       return res.status(404).json({ error: 'No se encontraron resultados para las coordenadas especificadas.' })
//     }

//     // Analizar los datos obtenidos
//     const nodes = response.data.osm.node

//     // Buscar nodos dentro del área especificada y verificar condiciones de accesibilidad
//     const lugaresAccesibles = nodes.filter(node => {
//       const latitud = parseFloat(node.$.lat)
//       const longitud = parseFloat(node.$.lon)

//       if (Math.abs(latitud - lat) <= 0.001 && Math.abs(longitud - lon) <= 0.001) {
//         const tags = node.tag
//         if (tags) {
//           const condicionesAccesibilidad = ['wheelchair=yes', 'wheelchair=limited', 'wheelchair=no', 'wheelchair=designated']
//           for (const condicion of condicionesAccesibilidad) {
//             if (tags.some(tag => tag.$.k === 'wheelchair' && tag.$.v === condicion)) {
//               return true
//             }
//           }
//         }
//       }

//       return false
//     })

//     // Retornar información de accesibilidad
//     if (lugaresAccesibles.length > 0) {
//       return res.json({ accesibilidad: 'El lugar consultado tiene alguna de las condiciones de accesibilidad.' })
//     } else {
//       return res.json({ accesibilidad: 'El lugar consultado no cumple con ninguna de las condiciones de accesibilidad.' })
//     }
//   } catch (error) {
//     console.error('Ocurrió un error al obtener la información de accesibilidad:', error)
//     return res.status(500).json({ error: 'Error al obtener la información de accesibilidad.' })
//   }
// }
const wheelchair = require('../utils/wheelchair')

const wheelchairAccessibilityController = async (req, res) => {
  const { lat, lng, accuracy } = req.body

  try {
    const opciones = await wheelchair(lat, lng, accuracy)
    res.send(opciones)
  } catch (error) {
    console.log('Error:', error)
    res.sendStatus(500)
  }
}

module.exports = { wheelchairAccessibilityController }
