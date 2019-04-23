module.exports = {
  wallets: {
    ethereum: '0xb1ad2347533b5388be9a0d81fe4e421e29af6fe8',
    bitcoin: '1EA34nZveGzwP43fphYo8bQ9KVUtdwX1WS\n',
    diadem: {
      address: '0x85a5082a6b01371cad401593ce6182e577af690f',
      privateKey: process.env.PRIVATE_KEY
    }
  },
  providers: {
    ethereum: 'https://mainnet.infura.io/v3/cd8401520b5e4bce93716ee0eebf277a',
    diadem: 'wss://diadem.host/loom'
  }
}