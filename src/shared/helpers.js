
module.exports = {
  createErrorResponse(error, includeStack = false) {
    return {
      statusCode: 500,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        message: error.message,
        stack: includeStack ? error.stack : undefined,
        error: true
      })
    }
  }
}
