const router = require('koa-router')();
const DB = require('../../model/db.js');

router.get('/',async (ctx)=>{

   let result = await DB.find('admin',{});

   await ctx.render('admin/mange/list.html',{
       result
   })
})

router.get('/add',async (ctx)=>{
    await ctx.render('admin/mange/add.html')
})

router.get('/delete',async (ctx)=>{
    ctx.body = '删除用户'
})

router.get('/edit',async (ctx)=>{
    ctx.body = '编辑用户'
})

module.exports =router.routes();
