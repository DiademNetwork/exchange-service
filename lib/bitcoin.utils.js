const btc = require('bitcoinjs-lib')
const config = require('./config')
const { publicKeyHash } = config.wallets.bitcoin

const NETWORK = btc.networks.bitcoin
const INSIGHT_URL = 'https://insight.bitpay.com/api'

const verifyTransaction = (decodedTransaction) => {
  const { to: recipient } = decodedTransaction

  return recipient.toLowerCase() === publicKeyHash.toLowerCase()
}

const decodeRawTransaction = (rawTransaction) => {
  try {
    const decodedTransaction = btc.Transaction.fromHex(rawTransaction)

    const { script, value } = decodedTransaction.outs[0]

    const scriptASM = btc.script.toASM(script)

    const to = scriptASM.match(/OP_DUP OP_HASH160 (.+) OP_EQUALVERIFY OP_CHECKSIG/)[1]

    return { to, value }
  } catch (e) {
    throw new Error('Invalid transaction')
  }
}

const broadcastTransaction = (signedTransaction) => {
  return axios.post(`${INSIGHT_URL}/tx/send`, {
    rawTx: signedTransaction
  })
}

module.exports = {
  verifyTransaction,
  decodeRawTransaction,
  broadcastTransaction
}