const fetch = require('node-fetch')

async function wheelchair (lat, lng, accuracy) {
  try {
    const response = await fetch(`https://accessibility-cloud.freetls.fastly.net/place-infos?appToken=c36009d4fabcc8b6c46a1c1f292c4d46&latitude=${lat}&longitude=${lng}&accuracy=${accuracy}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

// Ejemplo de uso:
// wheelchair(48.251, 16.5, 10000)

module.exports = wheelchair
