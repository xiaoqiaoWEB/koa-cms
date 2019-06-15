const router = require('koa-router')()
const DB = require('../../model/db')
const tool = require('../../model/tool')

router.get('/', async (ctx) => {
  await ctx.render('admin/login')
})

router.post('/doLogin', async (ctx) => {
  let {username, password} = ctx.request.body;
  let result = await DB.find('user',{username, password: tool.md5(password)})
  if(result.length > 0){
    console.log('登录成功！')
    // set session
    ctx.session.userinfo=result[0];
    ctx.redirect(ctx.state.__HOST__+'/admin');
  } else {
    console.log('登录失败！')
  }
})

module.exports = router.routes();