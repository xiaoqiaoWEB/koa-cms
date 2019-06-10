/*
 * 1.需要安装 express-session 和 connect-mongo 模块

 cnpm install express-session  --save

 cnpm install connect-mongo  --save


 2.引入

 var session = require("express-session");


 var  MongoStore  = require("connect-mongo")(session);


 3.设置官方文档提供的中间件

 app.use(session({
 	secret: 'keyboard cat',
	 resave: false,
	 saveUninitialized: true,

	 store:new MongoStore({
		 url: 'mongodb://127.0.0.1:27017/student',数据库的地址
	 	 touchAfter: 24 * 3600   time period in seconds
	 })


 }))


 4.使用

 设置值
 req.session.username = "张三";

 获取值 req.session.username

 * */


 const express = require('express')
 const session = require('express-session')

 let MongoStore = require('connect-mongo')(session)

 const app = new express();

 app.use(session({
   secret: 'xiaoqiao',
   name: 'session_id',
   resave: false,
   saveUninitialized: true,
   cookie: {
     maxAge: 1000*30*60
   },
   rolling: true,
   store: new MongoStore({
     url: 'mongodb://127.0.0.1:27017/iting',
     touchAfter: 24*3600
   })
 }))

 app.get('/', (req, res) => {

  if(req.session.userinfo) {
    res.send('你好'+req.session.userinfo+'欢迎回来')
  } else {
    res.send('你未登录')
  }

 })

 app.get('/login', (req, res) => {
   req.session.userinfo = 'xiaoqiao123456'
   res.send('登陆成功')
 })

app.get('/loginOut', (req, res) => {
  req.session.destroy((err) => {
    console.log(err)
  })
})

app.get("/news",function(req,res){

	if(req.session.userinfo){  /*获取*/
		res.send('你好'+req.session.userinfo+'欢迎回来 news');

	}else{

		res.send('未登录 news');
	}
});


 app.listen(9000)