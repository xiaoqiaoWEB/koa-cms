const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router(); 

router.get('/', (ctx) => {
  ctx.body = "首页"
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  
app.listen(9000)