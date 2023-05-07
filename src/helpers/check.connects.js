const mongoose = require('mongoose')
const process = require('process')
const os = require('os')
const SECONDS = 20000

//count number of connections with mongo
const countConnect = () => {
  console.log(`Number of connections::${mongoose.connections.length}`)
}

//check overload every 5s
const checkOverload = () => {
  setInterval(() => {
    const numConnect = mongoose.connections.length
    const numCores = os.cpus().length
    const memoryUsage = process.memoryUsage().rss
    const maxConnections = numCores * 5
    
    console.log(`\nActive connections::${numConnect}`)
    console.log(`Memory usaage::${memoryUsage / 1024 / 1024}MB\n`)
    if(numConnect > maxConnections){
      console.log('Server is overloading !')
    }
  }, SECONDS)
}

module.exports = {
  countConnect,
  checkOverload
}