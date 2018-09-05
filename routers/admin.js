const router = require('koa-router')();
const url = require('url');

let login = require('./admin/login.js');
let user = require('./admin/user.js');

router.use(async (ctx,next)=>{
    ctx.state.__HOST__ = "http://" + ctx.request.header.host;

    let pathName = url.parse(ctx.request.url).pathname;

    //session 利用session 来判断是否 已经 登录 没有登录 先登录
    if(ctx.session.userInfo){
        await next();
    }else{
        if(pathName == '/admin/login' || pathName == '/admin/login/doLogin'){
            await next();
        }else{
            ctx.redirect('/admin/login');
        }
    }

})


router.get('/',async (ctx)=>{
    await ctx.render('admin/index.html')
})


router.use('/login',login);
router.use('/user',user);


module.exports =router.routes();
