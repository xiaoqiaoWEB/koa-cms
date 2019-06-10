const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')
//const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const render = require('koa-art-template')

const app = new Koa()
const router = new Router(); 

//app.use(views('views', {map: {html: 'ejs'}})) //html
//app.use(views('views', {extension: 'ejs'})) //ejs
app.use(bodyParser());
app.use(static(path.join(__dirname, 'static')))

// router.get('/', async (ctx) => {
//   await ctx.render('index', {
//     title: '这是第一个小程序',
//     html: `
//       <div>
//         asdfsadfasdfasfsadfdivdividv
//       </div>
//     `
//   })
// })

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})

router.get('/', async (ctx) => {
  await ctx.render('index',
  {
    list: [1,2.3],
    name: 'xiaoqiaop'
  })
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  
app.listen(9000)