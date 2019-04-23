const ApiBuilder = require('claudia-api-builder')
const AWS = require('aws-sdk')

const api = new ApiBuilder()

api.get('/', (request) => {
  return { ok: true }
})

module.exports = api