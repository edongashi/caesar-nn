const fs = require('fs')
const brain = require('brain.js')
const trainingData = require('./training-data')

const net = new brain.NeuralNetwork()

net.train(trainingData, {
  callback: console.log,
  iterations: 1000
})

fs.writeFileSync('model.js', `module.exports = (${net.toFunction().toString()});`)
