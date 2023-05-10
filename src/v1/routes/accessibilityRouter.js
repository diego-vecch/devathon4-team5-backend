const express = require('express')
const Accessibilityrouter = express.Router();
const https = require('https');

Accessibilityrouter.get('/wheelchair', (req, res) => {
  const url = 'https://overpass-api.de/api/interpreter?data=[out:json];(node["wheelchair"="yes"](41.3,-72.9,41.4,-72.8);way["wheelchair"="yes"](41.3,-72.9,41.4,-72.8);relation["wheelchair"="yes"](41.3,-72.9,41.4,-72.8););out;';

  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      res.status(200).json(JSON.parse(data));
    });
  }).on('error', (error) => {
    res.status(500).send('Internal Server Error');
  });
});

module.exports = Accessibilityrouter;
