const router = require('koa-router')();
const DB = require('../../model/db')
const tool = require('../../model/tool')

router.get('/', async (ctx) => {
  var result=await DB.find('nav',{});
  await  ctx.render('admin/nav/list',{
    list:result
  })
})

router.get('/add', async (ctx) => {
  ctx.render('admin/nav/add')
})

router.post('/doAdd',async (ctx)=>{
  
  var title=ctx.request.body.title;
  var url=ctx.request.body.url;
  var sort=ctx.request.body.sort;
  var status=ctx.request.body.status;
  var add_time=tool.setTime();

  await  DB.insert('nav',{title,url,sort,status,add_time});

  //跳转
  ctx.redirect(ctx.state.__HOST__+'/admin/nav');

})

router.get('/edit',async (ctx)=>{

  var id=ctx.query.id;
  var result=await DB.find('nav',{"_id":DB.getObjectId(id)});

  await  ctx.render('admin/nav/edit',{
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
  var add_time=tool.setTime();

  await  DB.updata('nav',{"_id":DB.getObjectId(id)},{title,url,sort,status,add_time});

  //跳转
  if(prevPage){
    ctx.redirect(prevPage);
  }else{
    //跳转
    ctx.redirect(ctx.state.__HOST__+'/admin/nav');
  }

})


module.exports = router.routes();