const { describe } = require('riteway')

const bitcoin = require('../lib/bitcoin.utils.js')
const config = require('../lib/config')
const { publicKeyHash } = config.wallets.bitcoin

describe('bitcoin transactions', async assert => {
  const signedTransaction = '01000000019d344070eac3fe6e394a16d06d7704a7d5c0a10eb2a2c16bc98842b7cc20d561000000006b48304502210088828c0bdfcdca68d8ae0caeb6ec62cd3fd5f9b2191848edae33feb533df35d302202e0beadd35e17e7f83a733f5277028a9b453d525553e3f5d2d7a7aa8010a81d60121029f50f51d63b345039a290c94bffd3180c99ed659ff6ea6b1242bca47eb93b59fffffffff01e02e0000000000001976a91406afd46bcdfd22ef94ac122aa11f241244a37ecc88ac00000000'

  assert({
    given: 'hex transaction',
    should: 'decode transaction',
    actual: bitcoin.decodeRawTransaction(signedTransaction),
    expected: {
      to: '06afd46bcdfd22ef94ac122aa11f241244a37ecc',
      value: 12000
    }
  })

  assert({
    given: 'valid transaction',
    should: 'accept transaction',
    actual: bitcoin.verifyTransaction({ to: publicKeyHash }),
    expected: true
  })

  assert({
    given: 'non-expected transaction',
    should: 'reject transaction',
    actual: bitcoin.verifyTransaction({ to: '' }),
    expected: false
  })
})