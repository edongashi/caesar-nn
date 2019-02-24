const _ = require('lodash')
const { encrypt, ALPHABET_LENGTH } = require('./cipher')
const { normalize, stringStats } = require('./string-utils')

function at(index) {
  const result = []
  for (let i = 0; i < ALPHABET_LENGTH; i++) {
    result.push(i === index ? 1 : 0)
  }

  return result
}

function generatePatterns(str) {
  let data = []
  for (let i = 0; i < ALPHABET_LENGTH; i++) {
    const ciphertext = encrypt(str, i)
    data.push({
      input: stringStats(ciphertext),
      output: at(i)
    })
  }

  return data
}

function createTrainingData(strings) {
  return _
    .chain(strings)
    .map(normalize)
    .uniq()
    .flatMap(str => generatePatterns(str))
    .value()
}

module.exports = {
  createTrainingData
}
