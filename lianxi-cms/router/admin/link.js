const router = require('koa-router')()
const DB = require('../../model/db')
const tool = require('../../model/tool')
const multer = require('koa-multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload') /*配置图片上传的目录     注意：图片上传的目录必须存在*/
  },
  filename: function (req, file, cb) { /*图片上传完成重命名*/
    var fileFormat = (file.originalname).split(".");
    //cb(null, file.fieldname + '-' + Date.now())
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
var upload = multer({ storage: storage })

router.get('/', async (ctx) => {
  var page=ctx.query.page ||1;
  var pageSize=3;
  var result= await DB.find('link',{},{},{
      page,
      pageSize,
      sortJson:{
        "add_time":-1
      }
  });
  var count= await  DB.count('link',{});  /*总数量*/
  await  ctx.render('admin/link/index',{
      list:result,
      page:page,
      totalPages:Math.ceil(count/pageSize)
  });
})

router.get('/add', async (ctx) => {  
  ctx.render('admin/link/add')
})

router.post('/doAdd', upload.single('pic'), async (ctx) => {
  var title= ctx.req.body.title;
  let pic=ctx.req.file? ctx.req.file.path.substr(7) :'';
  var url=ctx.req.body.url;
  var sort=ctx.req.body.sort;
  var status=ctx.req.body.status;
  var add_time=tool.setTime();

  await  DB.insert('link',{
    title,pic,url,sort,status,add_time
  })
  //跳转
  ctx.redirect(ctx.state.__HOST__+'/admin/link');
})

router.get('/edit',async (ctx)=>{
  var id=ctx.query.id;
  var result=await DB.find('link',{"_id":DB.getObjectId(id)});

  await  ctx.render('admin/link/edit',{
    list:result[0],
    prevPage:ctx.state.G.prevPage
  });
})

router.post('/doEdit', upload.single('pic'), async (ctx) => {
  var id=ctx.req.body.id;
  var title=ctx.req.body.title;
  let pic=ctx.req.file? ctx.req.file.path.substr(7) :'';
  var url=ctx.req.body.url;
  var sort=ctx.req.body.sort;
  var status=ctx.req.body.status;
  var add_time=tool.setTime();
  var prevPage=ctx.req.body.prevPage;
  if(pic){
    var json={
      title,pic,url,sort,status,add_time
    }
  }else{
    var json={
      title,url,sort,status,add_time
    }
  }
  await  DB.updata('link',{'_id':DB.getObjectId(id)},json);

  if(prevPage){
    ctx.redirect(prevPage);
  }else{
    //跳转
    ctx.redirect(ctx.state.__HOST__+'/admin/link');
  }
})

module.exports = router.routes(); 