const app = require('./src/app')
const {app: {port}} = require('./src/config/config')

const PORT = port || 3035

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// process.on('SIGINT', () => {
//   server.close(() => {
//     console.log('Exit server')
//   })
// })