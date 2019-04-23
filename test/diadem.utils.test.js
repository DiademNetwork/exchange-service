const { describe } = require('riteway')

const diadem = require('../lib/diadem.utils.js')

describe('diadem', async assert => {
  assert({
    given: 'ethereum value',
    should: 'return diadem value',
    actual: await diadem.calculateAmount(1, 'ethereum'),
    expected: 300
  })
})
