const mongoose = require('./db')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    set(parmas) {
      if(!parmas) {
        return ' '
      } else {
        if(parmas.indexOf('XQ') != 0) {
          return `XQ${parmas}`
        }
      }
    }
  },
  age: Number,
  status: {
    type: Number,
    default: 1
  }
})

module.exports = mongoose.model('User', UserSchema, 'user')