const router = require('koa-router')();
const url = require('url');

let login = require('./admin/login.js');
let index = require('./admin/index.js');
let user = require('./admin/user.js');
let mange = require('./admin/mange.js');
let articlecate = require('./admin/articlecate.js');
let article = require('./admin/article.js');
let focus = require('./admin/focus');

//富文本
let ueditor = require('koa2-ueditor');

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
router.use('/article',article);
router.use('/focus',focus);

//上传图片的路由   ueditor.config.js配置图片post的地址
router.all('/editorUpload', ueditor(['public', {
    "imageAllowFiles": [".png", ".jpg", ".jpeg"],
    "imagePathFormat": "/upload/ueditor/image/{yyyy}{mm}{dd}/{filename}"  // 保存为原文件名
}]))

module.exports =router.routes();
