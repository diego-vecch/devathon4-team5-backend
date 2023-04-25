const createResponse = (success, data, errorMsg, statusCode) => {
  return {
    success,
    data,
    errorMsg,
    statusCode
  }
}

module.exports = { createResponse }
