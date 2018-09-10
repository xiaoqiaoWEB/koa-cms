var router = require('koa-router')();
var DB=require('../../model/db.js');
var tools=require('../../model/tools.js');

router.get('/',async (ctx)=>{

    var result = await DB.find('navbar',{});

     //console.log(result)

    await  ctx.render('admin/navbar/list',{
        list:result
    })

})


router.get('/add',async (ctx)=>{
    ctx.render('admin/navbar/add.html');
})

router.post('/doAdd',async (ctx)=>{

    var title=ctx.request.body.title;
    var url=ctx.request.body.url;
    var sort=ctx.request.body.sort;
    var status=ctx.request.body.status;
    var add_time= new Date();

    //添加到数据库
    await DB.insert('navbar',{title,url,sort,status,add_time});

    //跳转
    ctx.redirect(ctx.state.__HOST__+'/admin/navbar');
})

router.get('/edit',async (ctx)=>{
    var id=ctx.query.id;
    var result=await DB.find('navbar',{"_id":DB.getObjectId(id)});

    await  ctx.render('admin/navbar/edit',{
        list:result[0],
        prevPage:ctx.state.G.prevPage
    });
})

router.post('/doEdit',async (ctx)=>{
    var id=ctx.request.body.id;
    var title=ctx.request.body.title;
    var url=ctx.request.body.url;
    var sort=ctx.request.body.sort;
    var status=ctx.request.body.status;
    var prevPage=ctx.request.body.prevPage;
    var add_time= new Date();

    await  DB.update('navbar',{"_id":DB.getObjectId(id)},{title,url,sort,status,add_time});

    //跳转
    if(prevPage){
        ctx.redirect(prevPage);
    }else{
        //跳转
        ctx.redirect(ctx.state.__HOST__+'/admin/navbar');
    }
})



module.exports=router.routes();
