const router = require('koa-router')();
const DB = require('../model/db.js');

router.get('/',async (ctx)=>{
    ctx.body = 'api'
})

router.get('/news',async (ctx)=>{

    let result = await DB.find('articlecate',{});

    ctx.body = {
        result
    }
})



module.exports =router.routes();
