require('dotenv').config()

const dev = {
  app: {
    host: process.env.DEV_APP_HOST,
    port: process.env.DEV_APP_PORT,
  },
  db: {
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    name: process.env.DEV_DB_NAME
  },
};

const pro ={}

const config = {dev, pro}
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]