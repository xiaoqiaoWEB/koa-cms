const router = require('koa-router')()
const DB = require('../../model/db')
const tool = require('../../model/tool')
const svgCaptcha = require('svg-captcha')

router.get('/', async (ctx) => {
  await ctx.render('admin/login')
})

router.get('/code', async (ctx) => {
  var captcha = svgCaptcha.createMathExpr({
    size:4,
    fontSize: 50,
    width: 100,
    height:40,
    background:"#cc9966"
  });

  ctx.session.code = captcha.text
  ctx.response.type = 'image/svg+xml'
  ctx.body=captcha.data;
})

router.post('/doLogin', async (ctx) => {
  let {username, password, code} = ctx.request.body;

  // 先 验证码验证
  if(code == ctx.session.code) {
    let result = await DB.find('user',{username, password: tool.md5(password)})
    if(result.length > 0) {
      console.log('登录成功！')
      ctx.session.userinfo=result[0];
      // 更新登录时间
      await DB.updata('user', {"_id": DB.getObjectId(result[0]._id)}, {
        last_time: new Date()
      })
      ctx.redirect(ctx.state.__HOST__+'/admin');
    } else {
      ctx.render('admin/error',{
        message:'用户名或者密码错误',
        redirect: ctx.state.__HOST__+'/admin/login'
      })
    }
  } else {
    ctx.render('admin/error',{
      message:'验证码失败',
      redirect: ctx.state.__HOST__+'/admin/login'
    })
  }
})

router.get('/loginOut', async (ctx) => {
  ctx.session.userinfo = null;
  ctx.redirect(ctx.state.__HOST__+'/admin/login')
})

module.exports = router.routes();