const Web3 = require('web3')
const ethereumTxDecoder = require('ethereum-tx-decoder')

const config = require('./config')
const proxyWallet = config.wallets.ethereum
const providerUrl = config.providers.ethereum

const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl))

const decodeRawTransaction = (rawTransaction) => {
  const decodedTransaction = ethereumTxDecoder.decodeTx(rawTransaction)

  return {
    to: decodedTransaction.to.toLowerCase(),
    value: decodedTransaction.value.toNumber()
  }
}

const isValidRecipient = (recipient) =>
  recipient.toLowerCase() == proxyWallet.toLowerCase()

const verifyTransaction = (decodedTransaction) => {
  const { to: recipient } = decodedTransaction

  return isValidRecipient(recipient)
}

const broadcastTransaction = (signedTransaction) => {
  return web3.eth.sendSignedTransaction(signedTransaction)
}

module.exports = {
    verifyTransaction,
    decodeRawTransaction,
    broadcastTransaction
}