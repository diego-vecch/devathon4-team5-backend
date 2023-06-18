const fetch = require('node-fetch')

const appToken = process.env.APP_TOKEN_ACCESSIBILITY_CLOUD
async function wheelchair (lat, lng, accuracy) {
  try {
    const response = await fetch(`https://accessibility-cloud.freetls.fastly.net/place-infos?appToken=${appToken}&latitude=${lat}&longitude=${lng}&accuracy=${accuracy}`, {
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

module.exports = wheelchair
