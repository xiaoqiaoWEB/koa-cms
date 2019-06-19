const router = require('koa-router')()
const login = require('./admin/login')
const user = require('./admin/user')
const adminIndex = require('./admin/index')
const classification = require('./admin/classification')
const url = require('url')

router.use(async (ctx, next) => {
  // 配置全局 __HOST__
  ctx.state.__HOST__='http://'+ctx.request.header.host;
  var pathname=url.parse(ctx.request.url).pathname.substring(1);
  var splitUrl=pathname.split('/');

  ctx.state.G = {
    userinfo: ctx.session.userinfo,
    url: splitUrl,
    prevPage:ctx.request.headers['referer'] 
  }

  if(ctx.session.userinfo){
    await next();
  } else {
    if(pathname=='admin/login' || pathname=='admin/login/doLogin'  || pathname=='admin/login/code'){
      await next();
    } else {
      ctx.redirect('/admin/login');
    }
  }
})

router.get('/', async (ctx) => {
  ctx.render('admin/index.html')
})

router.use(adminIndex)
router.use('/login', login)
router.use('/user', user)
router.use('/classification', classification)

module.exports = router.routes();