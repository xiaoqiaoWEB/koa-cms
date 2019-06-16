const Koa = require('koa')
const router = require('koa-router')()
const path = require('path')
const render = require('koa-art-template')
const static = require('koa-static')
const session = require('koa-session')
const bodyParser =require('koa-bodyparser') 
const sd = require('silly-datetime')
const jsonp = require('koa-jsonp')


const app = new Koa()

// jsonp 
app.use(jsonp())

// session
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess', 
  maxAge: 86400000,
  overwrite: true, 
  httpOnly: true, 
  signed: true, 
  rolling: true,
  renew: false
};
app.use(session(CONFIG, app));

// bodyParser;
app.use(bodyParser());

// render
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  ebug: process.env.NODE_ENV !== 'production',
  dateFormat: dateFormat = function (value) {
    return sd.format(value, 'YYYY-MM-DD HH:mm');
  }
})

// static
app.use(static(__dirname + '/public'));

// model
const api = require('./router/api')
const admin = require('./router/admin.js')

// router
router.use('/api', api)
router.use('/admin', admin)

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(9000)
