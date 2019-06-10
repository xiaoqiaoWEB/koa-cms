/**
1.npm install mongodb --save-dev / cnpm install mongodb --save-dev

2.var MongoClient = require('mongodb').MongoClient;

 var url = 'mongodb://localhost:27017/test';   连接数据库的地址

 3.连接数据库

 MongoClient.connect(url, function(err, db) {

});

 4.实现增加修改删除

 MongoClient.connect(url, function(err, db) {

    db.collection('user').insertOne({'name':'zhangsan'},function(error,data){




    })

});
*/

let http = require('http')

let app = require('./model/express-route')

let MongoClient = require('mongodb').MongoClient;

let DBurl = 'mongodb://127.0.0.1:27017/itying'

http.createServer(app).listen(3000);


// add
app.get('/add', (req, res) => {

  MongoClient.connect(DBurl, (err, db) => {
    if(err) {
      console.lgo('连接数据库失败！')
      return 
    }
    db.collection("user").insertOne({
      "name": '乔海旭y',
      "age": 15
    },function(error, result) {
      if(error) {
        console.log('faile')
       return 
      }
      console.log(result)
      res.send('增加数据成功！')
      db.close();
    })

  })

})


// edit
app.get('/edit', (req, res) => {

  MongoClient.connect(DBurl, (err, db) => {
    if(err) {
      console.log('fail')
      return
    }
    db.collection("user").updateOne({"name": "12444"}, {$set: {"name": "乔海旭", age: 19}}, (error, result) => {
      if(error) {
        console.log(error)
        return
      }
      console.log(result)
      db.close()
      res.send('sucess')
    })
  })
})

//deleteOne

app.get('/delete', (req, res) => {
  MongoClient.connect(DBurl, (err, db) => {
    if(err) {
      console.log('fail')
      return
    }

    db.collection("user").deleteOne({"name": "乔海旭y"}, (error, data) => {
      if(error) {
        console.log(error)
        return
      }
    })
    //console.log(data)
    db.close()
    res.send('sucess')
  })
})