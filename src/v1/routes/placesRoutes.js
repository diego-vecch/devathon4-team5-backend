const express = require('express')
const placeController = require('../../controllers/placeController')

const placesRouter = express.Router()

placesRouter.route('/accessibility-wheelchair').post(placeController.wheelchairAccessibilityController)
// const https = require('https')

// plcesRouter.post('/wheelchair', (req, res) => {
//   const { lat, lon } = req.body
//   console.log(lat, lon)
//   const uno = -3.9646028
//   const dos = 40.4905358
//   const tres = -3.9641736
//   const cuatro = 40.4908525
//   console.log(uno, dos, tres, cuatro)
//   //   const cordenadas = (41.3, -72.9, 41.4, -72.8)
//   const url = `https://overpass-api.de/api/interpreter?data=[out:json];(node["wheelchair"="yes"](${uno},${dos},${tres},${cuatro});way["wheelchair"="yes"](${uno},${dos},${tres},${cuatro});relation["wheelchair"="yes"](${uno},${dos},${tres},${cuatro}););out;`

//   https.get(url, (response) => {
//     let data = ''

//     response.on('data', (chunk) => {
//       data += chunk
//     })

//     response.on('end', () => {
//       res.status(200).json(JSON.parse(data))
//     })
//   }).on('error', () => {
//     res.status(500).send('Internal Server Error')
//   })
// })

module.exports = placesRouter
