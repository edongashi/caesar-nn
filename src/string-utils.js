const { deburr, isString } = require('lodash')

const alphabet = Array.from('abcdefghijklmnopqrstuvwxyz')

function alphabetHash() {
  return alphabet.reduce((acc, letter) => {
    acc[letter] = 0
    return acc
  }, {})
}

function between(val) {
  return function (min, max) {
    return (val >= min && val <= max) ? 1 : 0
  }
}

function normalize(str) {
  if (!isString(str) || str.length === 0) {
    return ''
  }

  return Array
    .from(deburr(str.trim()).toLowerCase())
    .map(c => /[a-z]/.test(c) ? c : ' ')
    .join('')
    .replace(/[ \r\n]+/gm, ' ')
}

function stringStats(str) {
  const result = alphabetHash()
  let total = 0
  for (let i = 0; i < str.length; i++) {
    const letter = str[i]
    if (letter in result) {
      result[letter]++
      total++
    }
  }

  if (total > 0) {
    for (const letter in result) {
      const val = result[letter]
      result[letter] = val / total
    }
  }

  const range = between(str.length)
  result.lengthSingle = range(0, 1)
  result.lengthTiny = range(2, 10)
  result.lengthShort = range(11, 30)
  result.lengthMedium = range(31, 100)
  result.lengthLong = range(101, Infinity)
  return result
}

function normalizedStats(str) {
  return stringStats(normalize(str))
}

module.exports = {
  normalize,
  stringStats,
  normalizedStats
}
