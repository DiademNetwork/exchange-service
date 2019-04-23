const config = require('./config')
const proxyWallet = config.wallets.ethereum

const { exchangeFromEthereum } = require('./diadem.js')
const { decodeRawTransaction, verifyTransaction, broadcastTransaction } = require('./ethereum.utils.js')

const prepareTransaction = () => ({
  address: proxyWallet,
  encodedData: null
})

const supportAchievement = async ({ userAddress, signedRawTx }) => {
  const decodedTransaction = decodeRawTransaction(signedRawTx)
  const { to, value } = decodedTransaction

  if (verifyTransaction(decodedTransaction)) {
    // store ethereum on proxy wallet and send diadem coins to sponsor
    const transactions = await Promise.all([
      broadcastTransaction(signedRawTx),
      exchangeFromEthereum({ value, userAddress })
    ])

    return transactions
  } else {
    throw new Error('Non-expected transaction')
  }
}

module.exports = {
  prepareTransaction,
  supportAchievement,
}