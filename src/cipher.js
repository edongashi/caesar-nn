const { isString } = require('lodash')

const ALPHABET_LENGTH = 26
const UPPER_A = 65
const UPPER_Z = UPPER_A + ALPHABET_LENGTH - 1
const LOWER_A = 97
const LOWER_Z = LOWER_A + ALPHABET_LENGTH - 1

function mod(n, p) {
  if (n < 0) {
    n = p - Math.abs(n) % p
  }

  return n % p
}

function shift(code, key, start) {
  return String.fromCharCode(start + mod(code - start + key, ALPHABET_LENGTH))
}

function encrypt(str, key = 0) {
  if (!isString(str) || str.length === 0) {
    return ''
  }

  key = mod(key, ALPHABET_LENGTH)

  let cipher = []
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    if (code >= LOWER_A && code <= LOWER_Z) {
      cipher.push(shift(code, key, LOWER_A))
    } else if (code >= UPPER_A && code <= UPPER_Z) {
      cipher.push(shift(code, key, UPPER_A))
    } else {
      cipher.push(str[i])
    }
  }

  return cipher.join('')
}

function decrypt(str, key = 0) {
  return encrypt(str, -key)
}

module.exports = {
  encrypt,
  decrypt,
  ALPHABET_LENGTH
}
