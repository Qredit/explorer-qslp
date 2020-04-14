/** @module networks */

module.exports = {
  /** @type {Network} */
  qredit: {
    messagePrefix: '\x18Qredit Signed Message:\n',
    bip32: {
      public: 0x43587cf, // base58 will have a prefix 'qpub'
      private: 0x4358394 // base58Priv will have a prefix 'apriv'
    },
    name: 'mainnet',
    nethash: '5e67037fd290ba7ab378e84a591d251c46eb9770eb134983771fd602233bf193',
    token: 'Qredit',
    symbol: 'XQR',
    pubKeyHash: 0x3a, // Addresses will begin with 'Q'
    explorer: 'https://qredit.cloud',
    wif: 0xbb, // Network prefix for wif generation
    activePeer: {
      ip: 'https://qredit.cloud',
      port: null
    },
    peers: [
      { ip: '136.144.170.17', port: 4103 },
      { ip: '136.144.215.24', port: 4103 }
    ],
  }
}
