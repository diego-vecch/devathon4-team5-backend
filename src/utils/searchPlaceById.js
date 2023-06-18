const fetch = require('node-fetch')

async function searchPlaceById (type, id) {
  const appToken = process.env.APP_TOKEN_ACCESSIBILITY_CLOUD
  const TYPE = 'place-infos'
  const url = `https://accessibility-cloud-v2.freetls.fastly.net/${TYPE}/${id}.json?appToken=${appToken}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

module.exports = searchPlaceById
