const router = require('koa-router')()
const DB = require('../model/db')
const url = require('url')

// 配置全局
router.use(async (ctx, next) => {
  let pathname = url.parse(ctx.request.url).pathname;

  // 获取导航条数据
  let navResult = await DB.find('nav', {$or:[{'status':1},{'status':'1'}]}, {}, {
    sortJson:{'sort':1}
  })

  ctx.state.__HOST__='http://'+ctx.request.header.host;
  ctx.state.nav = navResult;
  ctx.state.pathname = pathname;

  await next();
})

// 首页
router.get('/', async (ctx) => {
  let banner = await DB.find('focus', {$or:[{'status':1},{'status':'1'}]}, {}, {
    sortJson:{'sort':1}
  })

  console.log(banner)

  await ctx.render('default/index.html', {
    banner
  })
})

router.get('/about', async (ctx) => {
  ctx.body = 'about'
})

router.get('/news', async (ctx) => {
  ctx.body = 'asdfs'
})


module.exports = router.routes();