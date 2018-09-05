const router = require('koa-router')();

router.get('/',async (ctx)=>{
    ctx.body = 'WEB'
})


module.exports =router.routes();
