const Koa = require('koa')
const Router = require('koa-router')

const router = new Router()

const app = new Koa()

const DB = require('./mongo/db')

router.get('/', async (ctx) => {
  let res = await DB.find('user',{'name': 'adminy'});
  ctx.body = res;
})

router.get('/add', async (ctx) => {
  let res = await DB.insert('user', {'name': 'xiaoqiao', 'age': 18})
  ctx.body = res;
})

router.get('/edit', async (ctx) => {
  let res = await DB.updata('user', {'name': 'xiaoqiao'}, {'age:': 30, 'status': '2'})
  ctx.body = res;
})

router.get('/delete', async (ctx) => {
  let res = await DB.remove('user', {'name': 'xiaoqiao'})
  ctx.body = res;
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8000)