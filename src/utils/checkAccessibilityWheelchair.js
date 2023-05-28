const KEY_GOOGLE_MAPS = process.env.KEY_GOOGLE_MAPS

const checkAccessibilityWheelchair = async (placeId) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=wheelchair_accessible_entrance&place_id=${placeId}&key=${KEY_GOOGLE_MAPS}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.status === 'OK') {
      const result = data.result
      const accessible = result.wheelchair_accessible_entrance

      return accessible
    } else {
      console.log('The request could not be completed')
    }
  } catch (error) {
    console.log('Error getting information.', error)
  }
}

module.exports = checkAccessibilityWheelchair
