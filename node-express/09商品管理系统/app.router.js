const express = require('express')

let index = require('./routers/index')
let admin = require('./routers/admin.js')
let session = require('express-session')

const app = new express();

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

//使用ejs模板引擎   默认找views这个目录
app.set('view engine','ejs');

//配置public目录为我们的静态资源目录
app.use(express.static('public'));

app.use('/upload',express.static('upload'));

app.use('/', index);

app.use('/admin', admin)

app.listen(8000)