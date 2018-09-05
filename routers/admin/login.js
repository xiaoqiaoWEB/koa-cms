const router = require('koa-router')();

const tools = require('../../model/tools.js');
const path = require('path');
const url = require('url');
const DB = require('../../model/db.js');


router.get('/',async (ctx)=>{
    ctx.render('admin/login.html')
})

router.post('/doLogin',async (ctx)=>{

    //post 传值
   let username =  ctx.request.body.username;
   let password =  ctx.request.body.password;

   //链接数据库 进行查找
    let data = await DB.find('admin',{"username":username,"password":tools.md5(password)});

    if(data[0]){
        console.log(data)
        ctx.session.userinfo = data[0];
        ctx.redirect(ctx.state.__HOST__+'/admin');
    }else{
        ctx.redirect(ctx.state.__HOST__+'/admin/login');
    }

})

module.exports =router.routes();
