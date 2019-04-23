const Web3 = require('web3')
const { describe } = require('riteway')
const config = require('../lib/config.js')
const ethereum = require('../lib/ethereum.utils.js')

const PROXY_WALLET = config.wallets.ethereum
const PROVIDER_URL = config.providers.ethereum

const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL))

const senderAddress = '0xf1a300806c2cdcC5671502817D9Bade074E65496'
const senderPrivateKey = '0x9179ed49fd6e81d45300e07c79d0c80d809412f895ce16fc9b6ec45ea4e0da03'

const generateContractSendTx = async ({ address, encodedData, amount, feeRate }) => {
  const params = {
    to: address,
    value: amount,
    gas: 21000,
    gasPrice: feeRate,
    chainId: 0,
    nonce: 0
  }

  const tx = await web3.eth.accounts.signTransaction(params, senderPrivateKey)

  return tx.rawTransaction
}

describe('ethereum transactions', async assert => {
/*
  assert({
    given: 'any arguments',
    should: 'return address of proxy ethereum wallet',
    actual: ethereum.prepareTransaction({
      creatorAddress: null,
      userAddress: null,
      amount: null,
      fees: null
    }),
    expected: {
      wallet: PROXY_WALLET
    }
  })
*/

  const signedTransaction = await generateContractSendTx({
    address: senderAddress,
    encodedData: PROXY_WALLET,
    amount: 0,
    feeRate: 0
  })

  assert({
    given: 'encoded transaction',
    should: 'decode transaction',
    actual: ethereum.decodeRawTransaction(signedTransaction),
    expected: {
      to: PROXY_WALLET,
      value: 0
    }
  })

  assert({
    given: 'valid support transaction',
    should: 'accept transaction',
    actual: ethereum.verifyTransaction(signedTransaction),
    expected: true
  })

  const invalidTransaction = await generateContractSendTx({
    address: senderAddress,
    encodedData: '0xf1a300806c2cdcC5671502817D9Bade074E65496',
    amount: 0,
    feeRate: 0
  })

  assert({
    given: 'non-expected transaction',
    should: 'fail to verify transaction',
    actual: ethereum.verifyTransaction(invalidTransaction),
    expected: false
  })

  /*
  assert({
    given: 'signed transaction',
    should: 'broadcast transaction to network',
    actual: await ethereum.broadcastTransaction(signedTransaction),
    expected: 'mock-transaction-id'
  })
  */

  /*
  assert({
    given: 'signed support transaction',
    should: 'verify transaction, broadcast transaction to ethereum network, send diadems to sender, return transactions ids',
    actual: ethereum.supportAchievement(signedTransaction)
  })

  assert({
    given: 'non-expected transaction',
    should: 'throw exception',
    actual: ethereum.supportAchievement()
  })
  */
})