// CommonJS CLI version
const split = require('split')
const { bech32 } = require('bech32')
const { toChecksumAddress } = require('web3-utils')

const {
  decode: bech32Decode,
  encode:  bech32Encode,
  fromWords: bech32FromWords,
  toWords: bech32ToWords
} = bech32

function makeBech32Encoder(prefix, limit) {
  return (data) => {
    if (data.substring(0, 2) !== '0x') {
      throw Error('Unrecognised address format');
    }
    return bech32Encode(prefix, bech32ToWords(Buffer.from(data.substring(2), "hex")), limit)
  }
}

function makeBech32Decoder(currentPrefix, limit) {
  return (data) => {
    const { prefix, words } = bech32Decode(data, limit);
    if (prefix !== currentPrefix) {
      throw Error('Unrecognised address format');
    }
    return toChecksumAddress(Buffer.from(bech32FromWords(words)).toString('hex'));
  };
}

const bech32Chain = (prefix, limit) => ({
  decoder: makeBech32Decoder(prefix, limit),
  encoder: makeBech32Encoder(prefix, limit),
});

const op = process.env.OP || 'encode'
const prefix = process.env.PREFIX || 'cosmos'

const { encoder, decoder } = bech32Chain(prefix)

const ops = {
  decode: address => decoder(address),
  encode: address => encoder(address)
}

process.stdin.pipe(split()).on('data', address => {
  address.length && console.log(JSON.stringify({ from: address, to: ops[op](address) }))
})