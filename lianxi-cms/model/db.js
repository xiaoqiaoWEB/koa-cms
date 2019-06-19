/*
 * http://mongodb.github.io/node-mongodb-native
 * http://mongodb.github.io/node-mongodb-native/3.0/api/
*/

const MongoDb = require('mongodb')
const MongoClient = MongoDb.MongoClient
const ObjectID = MongoDb.ObjectID;

const Config = require('./config')

class Db {
  static getInstance() {
    if(!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance
  }

  constructor () {
    this.dbClient = ''
    this.content()
  }

  content () {
    return new Promise((resolve, reject) => {
      if(!this.dbClient) {
        MongoClient.connect(Config.dbUrl, (err, client) => {
          if(err) {
            reject(err)
          } else {
            this.dbClient = client.db(Config.dbName)
            resolve(this.dbClient)
          }
        })
      } else {
        resolve(this.dbClient)
      }
    })
  }

  find (collectionName, json1, json2, json3) {
    let attr = {};
    let slipNum= 0;
    let pageSize = 0;
    let page = 1

    let len = arguments.length;
    switch (len) {
      case 2:
        attr = {}
        slipNum= 0
        pageSize = 0
        break;
      case 3:
        attr = json2
        slipNum= 0
        pageSize = 0
        break;
      case 4:
        attr = json2
        pageSize = json3.pageSize||20;
        page = json3.page || 1;
        slipNum=(page-1)*pageSize;
        break
      default:
        break;
    }

    return new Promise((resolve, reject) => {
      this.content().then((db) => {
        //let result = db.collection(collectionName).find(json);
        let result = db.collection(collectionName).find(json1, {fields: attr}).skip(slipNum).limit(pageSize)
        result.toArray((err,docs) => {
          if(err) {
            reject(err)
            return
          } else {
            resolve(docs)
          }
        })
      }) 
    })
  }

  count(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.content().then((db) => {
        let result = db.collection(collectionName).count(json);
        result.then((count) => {
          resolve(count)
        })
      })
    })
  }

  insert (collectionName, json) {
    return new Promise((resolve, reject) => {
      this.content().then((db) => {
        db.collection(collectionName).insertOne(json, (err,result) => {
          if(err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }

  updata (collectionName, json1, json2) {
    return new Promise((resolve, reject) => {
      this.content().then((db) => {
        //db.user.update({},{$set:{}})
        db.collection(collectionName).updateOne(json1, {$set: json2}, (err,result) => {
          if(err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }

  remove (collectionName, json) {
    return new  Promise((resolve,reject)=>{
      this.content().then((db) => {
        db.collection(collectionName).removeOne(json, (err,result) => {
          if(err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }

  getObjectId(id){
    return new ObjectID(id)
  }
}

module.exports=Db.getInstance();