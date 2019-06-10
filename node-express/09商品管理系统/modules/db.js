const MongoClient = require('mongodb').MongoClient
const DbUrl='mongodb://localhost:27017/iting';  /*连接数据库*/
const ObjectID = require('mongodb').ObjectID;

exports.ObjectID = ObjectID;

function __connectDb (callback) {
  MongoClient.connect(DbUrl, (err, db) => {
    if(err) {
      console.log('连接数据库失败')
      return;
    }
    callback(db);
  })
}

// find
exports.find = function (collectionname, json, callback) {
  __connectDb((db) => {
    var result = db.collection(collectionname).find(json);
    result.toArray((err, data) => {
      db.close();
      callback(err, data);
    })
  })
}

//insert
exports.insert = function (collectionname, json, callback) {
  __connectDb((db) => {
    db.collection(collectionname).insertOne(json,(err,data) => {
      callback(err, data);
    })
  })
}

// update
exports.update = function (collectionname, json1, json2, callback) {
  __connectDb((db) => {
    db.collection(collectionname).updateOne(json1, {$set: json2}, (err, data) => {
      callback(err, data);
    })
  })
}

// delete
exports.deleteOne = function (collectionname, json, callback) {
  __connectDb((db) => {
    db.collection(collectionname).deleteOne(json, (err, data) => {
      callback(err, data)
    })
  })
}