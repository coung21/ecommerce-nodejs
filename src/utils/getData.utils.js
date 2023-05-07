const lodash = require('lodash')

function getData({fields = [], object = {}}){
  return lodash.pick(object, fields)
}

module.exports = {
  getData
}