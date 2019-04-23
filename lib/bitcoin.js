const config = require('./config')
const proxyWallet = config.wallets.bitcoin

const { exchangeFromBitcoin } = require('./diadem.js')

const prepareTransaction = () => ({
  address: proxyWallet,
  encodedData: null
})

const { decodeRawTransaction, verifyTransaction, broadcastTransaction } = require('./bitcoin.utils.js')

const supportAchievement = async ({ userAddress, signedRawTx }) => {
  const decodedTransaction = decodeRawTransaction(signedRawTx)
  const { to, value } = decodedTransaction

  if (verifyTransaction(decodedTransaction)) {
    // store bitcoins on proxy wallet and send diadem coins to sponsor
    const transactions = await Promise.all([
      broadcastTransaction(signedRawTx),
      exchangeFromBitcoin({ value, userAddress })
    ])
  } else {
    throw new Error('Non-expected transaction')
  }
}

module.exports = {
  prepareTransaction,
  supportAchievement
}