const router = require('koa-router')();
const DB = require('../../model/db.js');
const tools = require('../../model/tools.js');

router.get('/',async (ctx)=>{

    let result = await DB.find('articlecate.js',{});

    let data = tools.changeData(result);

    await ctx.render('admin/articlecate/index.html',{
        list:data
    })

})

//增加列表
router.get('/add',async (ctx)=>{

    //获得一级分类名称
    let list = await DB.find('articlecate.js',{"pid":"0"});

    await ctx.render('admin/articlecate/add.html',{list})

    //ctx.body = list;

})

router.post('/doAdd',async (ctx)=>{
   let data = ctx.request.body;

   let result = await DB.insert('articlecate.js',data);

    ctx.redirect(ctx.state.__HOST__+'/admin/articlecate');

})

//修改列表
router.get('/edit',async (ctx)=>{

    let id = ctx.query.id;

    let result = await DB.find('articlecate.js',{"_id":DB.getObjectId(id)});

    let articlecate = await DB.find('articlecate.js',{"pid":"0"});
    console.log(articlecate)

    await ctx.render('admin/articlecate/edit.html',{
        list:result[0],
        listId:articlecate
    })
})

router.post('/doEdit',async (ctx)=>{

    var editData=ctx.request.body;
    var id=editData.id;       /*前台设置隐藏表单域传过来*/
    var title=editData.title;
    var pid=editData.pid;
    var keywords=editData.keywords;
    var status=editData.status;
    var description=editData.description;

    var result=await DB.update('articlecate.js',{'_id':DB.getObjectId(id)},{
        title,pid,keywords,status,description
    });

    ctx.redirect(ctx.state.__HOST__+'/admin/articlecate');

})



module.exports =router.routes();
