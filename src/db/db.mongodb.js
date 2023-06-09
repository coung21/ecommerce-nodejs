const mongoose = require('mongoose');
const { checkOverload } = require('../helpers/check.connects');
const {db: {port, host, name}} = require('../config/config')

class Database {
  constructor() {
    this.connect();
  }

  connect(type = 'mongodb') {
    // if (true) {
    //   mongoose.set('debug', true);
    //   mongoose.set('debug', { color: true });
    // }
    mongoose
      .connect(`mongodb://${host}:${port}/${name}`)
      .then(() => {
        console.log('connect to MongoDB successfully');
        checkOverload();
      })
      .catch((err) => {
        console.log('Connect to MongoDB has failed');
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const MongoConnection = Database.getInstance();
module.exports = MongoConnection;
