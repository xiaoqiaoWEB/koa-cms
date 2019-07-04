const mongoose = require('./db')

const UserSchema = mongoose.Schema({
  name: {
    type: {
      type: String,
      maxlength: 30,
      minlength: 4,
      require: true, // 必须有
    },
    // set(parmas) { //设置数据
    //   if(!parmas) {
    //     return ' '
    //   } else {
    //     if(parmas.indexOf('XQ') != 0) {
    //       return `XQ${parmas}`
    //     }
    //   }
    // }
  },
  age: {
    type: Number,
    require:true,
    min: 0,
    max: 150
  },
  status: {
    type: String,
    default: "suc",
    enum: ['suc', 'fail']
  },
  desc: {
    type: String,
    validate: function (desc) { // 自定义的验证器，如果通过验证返回 true，没有通过则返回 false 
      return desc.length >= 10;
    }
  }
})

UserSchema.statics.findByUid = function (uid, cb) {
  this.find({'_id': uid}, (err, docs) => {
    cb(err, docs)
  })
}



module.exports = mongoose.model('User', UserSchema, 'user')