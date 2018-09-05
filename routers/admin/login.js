const router = require('koa-router')();

const tools = require('../../model/tools.js');
const path = require('path');
const url = require('url');
const DB = require('../../model/db.js');
//svgCaptcha 验证码模块
const svgCaptcha = require('svg-captcha');

router.get('/',async (ctx)=>{
    ctx.render('admin/login.html')
})

router.post('/doLogin',async (ctx)=>{

    //1、验证用户名密码是否合法

    //2、去数据库匹配

    //3、成功以后把用户信息写入sessoin

    //post 传值
   let username =  ctx.request.body.username;
   let password =  ctx.request.body.password;
   let code = ctx.request.body.code;

   if(code == ctx.session.code) { //先进行验证码 验证
       //console.log('code')

       //链接数据库 进行查找
       let data = await DB.find('admin', {"username": username, "password": tools.md5(password)});

       if (data[0]) {
           //设置session
           ctx.session.userInfo = data[0];

           //登录成功 更新 最后登录时间
           await DB.update('admin',{"_id":DB.getObjectId(data[0]._id)},{
               last_time:new Date()
           })

           ctx.redirect(ctx.state.__HOST__ + '/admin');
       } else {
           ctx.render('admin/error',{
               message:'用户名或者密码错误',
               redirect: ctx.state.__HOST__+'/admin/login'
           })
       }
   }else{
       console.log('err')
       ctx.render('admin/error',{
           message:'验证码失败',
           redirect: ctx.state.__HOST__+'/admin/login'
       })
   }
})

//code 验证码
router.get('/code',async (ctx)=>{
    // var captcha = svgCaptcha.create({
    //     size:4,
    //     fontSize: 50,
    //     width: 120,
    //     height:34,
    //     background:"#cc9966"
    // });

    //加法的验证码
    var captcha = svgCaptcha.createMathExpr({
       size:4,
       fontSize: 50,
       width: 120,
       height:34,
       background:"#cc9966"
    });

    //生成 code session
    ctx.session.code = captcha.text;
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
})

//退出登录
router.get('/loginOut',(ctx)=>{
    ctx.state.G.userInfo = null;
    ctx.redirect(ctx.state.__HOST__+'/admin/login');
    //console.log('退出')
})


module.exports =router.routes();
