const rates = {
  bitcoin: async () => 10000,
  ethereum: async () => 300
}

const calculateAmount = async (value, currency) => {
  if (!rates[currency])
    throw new Error('Currency does not exist')

  const rate = await rates[currency]()

  const amount = value * rate

  return amount
}

module.exports = {
  calculateAmount
}