const md5 = require('md5')

const tool = {
  md5 (str) {
    return md5( md5(str) ) 
  }
}

module.exports = tool;