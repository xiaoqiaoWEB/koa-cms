const MongoClient = require('mongodb').MongoClient;

const dbUrl = 'mongodb://localhost:27017/';

const dbName = 'cms';


console.time('start')
MongoClient.connect(dbUrl, (err, client) => {
  if(err) {
    console.log(err)
    return
  }

  let db = client.db(dbName);

  db.collection('user').insertOne({'name':"xiaoqiao", 'pasword': '123456','age':26,'sex':"男","status":"1"}, (err, result) => {
    if(!err) {
      console.log('success')
      console.time('start')
      client.close();
    }
  })
})
