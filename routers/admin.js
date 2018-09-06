const router = require('koa-router')();
const url = require('url');

let login = require('./admin/login.js');
let index = require('./admin/index.js');
let user = require('./admin/user.js');
let mange = require('./admin/mange.js');
let articlecate = require('./admin/articlecate.js');

router.use(async (ctx,next)=>{
    ctx.state.__HOST__ = "http://" + ctx.request.header.host;

    let pathName = url.parse(ctx.request.url).pathname;

    ctx.state.G = {
        userInfo:ctx.session.userInfo,
        url:pathName.substring(1).split('/'),
        prevPage:ctx.request.headers['referer']   //上一页
    }


    //权限设置
    //session 利用session 来判断是否 已经 登录 没有登录 先登录
    if(ctx.session.userInfo){
        //console.log('已经登录')
        await next();
    }else{
        if(pathName == '/admin/login' || pathName == '/admin/login/doLogin' || pathName == '/admin/login/code'){
            //console.log('在登录')
            await next();
        }else{
           // console.log('重新登录')
            ctx.redirect('/admin/login');
        }
    }

})

router.get('/',async (ctx)=>{
    await ctx.render('admin/index.html')
})

router.use(index);
router.use('/login',login);
router.use('/user',user);
router.use('/mange',mange);
router.use('/articlecate',articlecate);

module.exports =router.routes();
