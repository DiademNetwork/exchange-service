const Web3 = require('web3')
const { Client, LocalAddress, CryptoUtils, LoomProvider } = require('loom-js')
const { calculateAmount } = require('./diadem.utils.js')

const config = require('./config')
const providerUrl = config.providers.diadem
const { privateKey } = config.wallets.diadem

const chainId = 'default'
const writeUrl = `${providerUrl}/websocket`
const readUrl = `${providerUrl}/queryws`

const privateKeyRaw = CryptoUtils.B64ToUint8Array(privateKey)
const client = new Client(chainId, writeUrl, readUrl)
const web3 = new Web3(new LoomProvider(client, privateKeyRaw))

const transfer = async (amount, address) => {
  const weiAmount = web3.utils.toWei(amount)

  const params = {
    to: address,
    value: weiAmount,
    gas: 21000
  }

  const { rawTransaction } = await web3.eth.accounts.signTransaction(params, privateKey)

  const receipt = await web3.eth.sendSignedTransaction(rawTransaction)

  return receipt // .transaction_id
}

const exchangeFromEthereum = async ({ decodedTransaction, userAddress }) => {
  const amount = await calculateAmount(value, 'ethereum')

  await transfer(amount, userAddress)
}

const exchangeFromBitcoin = () => null

module.exports = {
  exchangeFromEthereum,
  exchangeFromBitcoin
}