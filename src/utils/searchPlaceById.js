const https = require('https')
require('dotenv').config()

const KEY_GOOGLE_MAPS = process.env.KEY_GOOGLE_MAPS

const searchPlaceById = (id) => {
  return new Promise((resolve, reject) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=wheelchair_accessible_entrance%2Copening_hours%2Cdelivery%2Cphotos%2Ctypes%2Cvicinity%2Cwebsite&place_id=${id}&key=${KEY_GOOGLE_MAPS}`

    https.get(url, (response) => {
      let data = ''

      response.on('data', (chunk) => {
        data += chunk
      })

      response.on('end', () => {
        resolve(JSON.parse(data))
      })
    }).on('error', (error) => {
      reject(error)
    })
  })
}

module.exports = searchPlaceById
