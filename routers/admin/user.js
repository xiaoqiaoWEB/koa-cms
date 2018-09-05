const router = require('koa-router')();

router.get('/',async (ctx)=>{
   await ctx.render('admin/user/list.html')
})

router.get('/add',async (ctx)=>{
    await ctx.render('admin/user/add.html')
})

router.get('/delete',async (ctx)=>{
    ctx.body = '删除用户'
})

router.get('/edit',async (ctx)=>{
    ctx.body = '编辑用户'
})

module.exports =router.routes();
