const buildHostName = (request) => {
  return request.hostname !== 'localhost' ? request.hostname : `${request.hostname}:${process.env.PORT}`
}

module.exports = buildHostName
