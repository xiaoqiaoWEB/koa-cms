
const UserMoel = require('./model/user')

const User = new UserMoel({
  name: '123',
  age: 30
})

// UserMoel.find({}, (err, docs) => {
//   console.log(docs)
// })

// User.save((err) => { //添加数据
//   if(err) {
//     console.log(err)
//     return
//   }
//   UserMoel.find({}, (err1, doc) => { //查找
//     if(err1) {
//       console.log(err1)
//       return
//     }
//     console.log(doc);
//   })
// })

// 修改数据
// User.updateOne({}, {}, callback(err, res))

// 删除数据
//User.deleteOne({ _id: '5b72ada84e284f0acc8d318a' }, callback(err))

// 静态方法
UserMoel.findByUid('5d1b4cd891316523f009c8de', (err, docs) => {
  console.log(docs)
})

