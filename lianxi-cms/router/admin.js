const router = require('koa-router')()
const login = require('./admin/login')
const user = require('./admin/user')
const url = require('url')

router.use(async (ctx, next) => {
  // 配置全局 __HOST__
  ctx.state.__HOST__='http://'+ctx.request.header.host;
  var pathname=url.parse(ctx.request.url).pathname;
  if(ctx.session.userinfo){
    await next();
  } else {
    if(pathname=='/admin/login' || pathname=='/admin/login/doLogin'  || pathname=='/admin/login/code'){
      await next();
    } else {
      ctx.redirect('/admin/login');
    }
  }
})

// router.use(async (ctx, next) => {
//   if(ctx.session.userinfo) {
//     await next()
//   } else {
//     if(ctx.request.url == '/admin/login' || ctx.request.url == '/admin/login/doLogin') {
//       await  next();
//     } else {
//       ctx.redirect('/admin/login')
//     }
//   }
// })

router.get('/', async (ctx) => {
  ctx.render('admin/index.html')
})

router.use('/login', login)
router.use('/user', user)

module.exports = router.routes();