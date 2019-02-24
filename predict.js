const _ = require('lodash')
const run = require('./model')
const { encrypt, decrypt } = require('./src/cipher')
const { normalizedStats } = require('./src/string-utils')

function predict(str) {
  const result = run(normalizedStats(str)).map((p, key) => [p, key])
  return _
    .chain(result)
    .orderBy(([p, key]) => p, 'desc')
    .take(3)
    .map(([p, key]) => ({
      text: decrypt(str, key),
      key,
      probability: (Math.round(10000 * p) / 100) + '%'
    }))
    .value()
}

predict.test = function test(str, key = 0) {
  return predict(encrypt(str, key))
}

module.exports = predict
