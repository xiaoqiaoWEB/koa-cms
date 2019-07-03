const mongoose = require('mongoose')

mongoose.connect('mongodb://cmsadmin:123456@localhost:27017/cms', {useNewUrlParser: true}, (err) => {
  if(err) {
    console.log(err)
    return
  }
  console.log('连接成功')
});


// 连接完成
// mongoose.connection.on('connected', function () {    
//   console.log('Mongoose connection open to ');  
// });  

/**
 * 连接异常
 */
// mongoose.connection.on('error',function (err) {    
//   console.log('Mongoose connection error: ' + err);  
// });    

/**
 * 连接断开
 */
// mongoose.connection.on('disconnected', function () {    
//   console.log('Mongoose connection disconnected');  
// });   

module.exports = mongoose;
