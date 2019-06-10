const express = require('express')
const bodyParser = require('body-parser')
const md5 = require('md5-node')
const fs = require('fs')

//数据库操作
// const MongoClient = require('mongodb').MongoClient
// const DbUrl='mongodb://localhost:27017/iting';  /*连接数据库*/

const DB = require('./modules/db.js')


const app = new express();

var multiparty = require('multiparty');

// 设置body-parser中间件
//app.use(bodyParser.urlencoded({ extended: false }));

//app.use(bodyParser.json());

// ejs
app.set('view engine','ejs');

//配置public目录为我们的静态资源目录
app.use(express.static('public'));

app.use('/upload',express.static('upload'));

//保存用户信息
var session = require("express-session");
//配置中间件  固定格式
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge:1000*60*30
    },
    rolling:true 
}))

//判断登录状态
// app.use((req, res, next) => {
//   if(req.url=='/login' || req.url=='/doLogin'){
//     next();
//   } else {
//     if(req.session.userinfo && req.session.userinfo.username != '') {
//       //设置全局 
//       app.locals['userinfo'] = req.session.userinfo;
//       next();
//     } else {
//       res.redirect('/login')
//     }
//   }
// })

app.get('/', (req, res) => {
  res.send(md5('123456'))
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/doLogin', (req, res) => {
  let username = req.body.username;
  let password = md5(req.body.password);
  DB.find('admin',{
    username,
    password
  },(err, data) => {
    if(data.length>0){
      //保存用户信息
      console.log('登录成功');
      req.session.userinfo = data[0]
      res.redirect('/product');  /*登录成功跳转到商品列表*/
    } else {
      res.send("<script>alert('登录失败');location.href='/login'</script>");
    }
  })
})

app.post('/doLoginOld', (req, res) => {
  //1.获取数据
  //2.连接数据库查询数据

  // 连接数据库
  MongoClient.connect(DbUrl, (err, db) => {
    if(err) {
      console.log(err);
      return
    }
    // 查询数据
    let username = req.body.username;
    let password = md5(req.body.password);
    let result = db.collection('admin').find({
      username,
      password
    });

    result.toArray(function(err,data){
      console.log(data);
      if(data.length>0){
          console.log('登录成功');
          //保存用户信息
          req.session.userinfo = data[0]

          res.redirect('/product');  /*登录成功跳转到商品列表*/

      }else{
          //console.log('登录失败');
          res.send("<script>alert('登录失败');location.href='/login'</script>");
      }
      db.close();
    })
  })
})

// 退出登录
app.get('/loginOut', (req, res) => {
  //销毁session
  req.session.destroy((err) => {
    if(err) {
      console.log(err)
    } else {
      res.redirect('/login')
    }
  })
})

app.get('/product', (req, res) => {
  DB.find('product', {}, (err, data) => {
    res.render('product',{
      list: data
    })
  })
  //res.render('product')
})

app.get('/productadd', (req, res) => {
  res.render('productadd')
})

//添加商品
app.post('/doProductAdd', (req, res) => {
  let form = new multiparty.Form();
  form.uploadDir='upload'   //上传图片保存的地址     目录必须存在
  form.parse(req, (err, fields, files) => {
    // fields 表单数据  
    // files 图片上传成功返回的信息
    
    console.log(files)

    var title=fields.title[0];
    var price=fields.price[0];
    var fee=fields.fee[0];
    var description=fields.description[0];
    var pic=files.pic[0].path;
    DB.insert('product',{
      title:title,
      price:price,
      fee,
      description,
      pic
    },function(err,data){
        if(!err){
            res.redirect('/product'); /*上传成功跳转到首页*/
        }
    })
  })
})

//edit
app.get('/productedit', (req, res) => {
  console.log(req)
  let id = req.query.id;
  DB.find('product', {"_id": new DB.ObjectID(id)}, (err, data) => {
    res.render('productedit', {
      list: data[0]
    })
  })
})

//修改数据
app.post('/doProductEdit', (req, res) => {
  let form = new multiparty.Form();
  form.uploadDir='upload' 
  form.parse(req, (err, fields, files) => {
    let _id = fields._id[0];
    var title=fields.title[0];
    var price=fields.price[0];
    var fee=fields.fee[0];
    var description=fields.description[0];

    var originalFilename=files.pic[0].originalFilename;
    var pic=files.pic[0].path;

    if(originalFilename) {
      var setData={
        title,
        price,
        fee,
        description,
        pic
      };
    } else {
      var setData={
        title,
        price,
        fee,
        description
      };
      fs.unlink(pic);
    }
    DB.update('product',{"_id":new DB.ObjectID(_id)},setData,function(err,data){
      if(!err){
          res.redirect('/product');
      }
    })
  })
})

//删除
app.get('/productdelete', (req, res) => {
  var  id=req.query.id;
  DB.deleteOne('product',{"_id":new DB.ObjectID(id)},function(err){
    if(!err){
      res.redirect('/product');
    }
  })
})

app.listen(8000, '127.0.0.1')