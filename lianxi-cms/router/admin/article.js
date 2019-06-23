const router = require('koa-router')();
const DB = require('../../model/db')
const multer = require('koa-multer')
const tool = require('../../model/tool')

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
  let page = ctx.query.page ||1;
  let pageSize=5;
  let count = await DB.count('article', {});
  let result = await DB.find('article', {}, {}, {
    page,
    pageSize,
    sortJson: {
      'add_time': -1
    }
  })

  await ctx.render('admin/article/index.html', {
    list: result,
    page,
    totalPages: Math.ceil(count / pageSize)
  })
})

router.get('/add', async (ctx) => {
  var catelist=await DB.find('classification',{});

  await ctx.render('admin/article/add.html', {
    catelist:tool.dataArray(catelist)
  })
})

router.post('/doAdd', upload.single('img_url'), async (ctx) => {
  // ctx.body = {
  //   filename: ctx.req.file.filename,  //返回文件名
  //   body:ctx.req.body,
  //   path: ctx.req.file.path
  // }
  let pid=ctx.req.body.pid;
  let catename=ctx.req.body.catename.trim();
  let title=ctx.req.body.title.trim();
  let author=ctx.req.body.author.trim();
  //let pic=ctx.req.body.author;
  let status=ctx.req.body.status;
  let is_best=ctx.req.body.is_best;
  let is_hot=ctx.req.body.is_hot;
  let is_new=ctx.req.body.is_new;
  let keywords=ctx.req.body.keywords;
  let description=ctx.req.body.description || '';
  let content=ctx.req.body.content ||'';
  let img_url=ctx.req.file? ctx.req.file.path.substr(7) :'';
  let add_time = tool.setTime();

  //属性的简写
  let json={
      pid,catename,title,author,status,is_best,is_hot,is_new,keywords,description,content,img_url, add_time
  }
  var result=DB.insert('article',json);
  ctx.redirect(ctx.state.__HOST__+'/admin/article');
})

router.get('/edit', async (ctx) => {
  let id = ctx.query.id;
  // 分类列表
  let cateList = await DB.find('classification', {})
  let list = tool.dataArray(cateList)

  //编辑数据的 详情
  let detail = await DB.find('article', {'_id': DB.getObjectId(id)})
  
  await ctx.render('admin/article/edit.html', {
    catelist:list,
    list: detail[0],
    prevPage :ctx.state.G.prevPage
  })
})

router.post('/doEdit', upload.single('img_url'), async (ctx) => {
  let prevPage = ctx.req.body.prevPage || '';  /*上一页的地址*/
  let id=ctx.req.body.id;
  let pid=ctx.req.body.pid;
  let catename=ctx.req.body.catename.trim();
  let title=ctx.req.body.title.trim();
  let author=ctx.req.body.author.trim();
  //let pic=ctx.req.body.author;
  let status=ctx.req.body.status;
  let is_best=ctx.req.body.is_best;
  let is_hot=ctx.req.body.is_hot;
  let is_new=ctx.req.body.is_new;
  let keywords=ctx.req.body.keywords;
  let description=ctx.req.body.description || '';
  let content=ctx.req.body.content ||'';
  let img_url=ctx.req.file? ctx.req.file.path.substr(7) :'';
  if(img_url){
    var json={
      pid,catename,title,author,status,is_best,is_hot,is_new,keywords,description,content,img_url
    }
  }else{
    var json={
      pid,catename,title,author,status,is_best,is_hot,is_new,keywords,description,content
    }
  }
  DB.updata('article',{"_id":DB.getObjectId(id)},json);
   //跳转
  if(prevPage){
    ctx.redirect(prevPage);
  }else{
    ctx.redirect(ctx.state.__HOST__+'/admin/article');
  }
})

module.exports = router.routes();

/*
* 图片上传模块的使用
1.安装
    cnpm instlal koa-multer --save


2、引入

 const multer = require('koa-multer');


3.配置上传的目录以后文件名称
     const multer = require('koa-multer');
     var storage = multer.diskStorage({
         destination: function (req, file, cb) {


         cb(null, 'public/upload');
        },
        filename: function (req, file, cb) {
            var fileFormat = (file.originalname).split(".");
            cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    })
    var upload = multer({ storage: storage });

4、接收数据

    注意 ：post

    注意：form表单必须加上 enctype="multipart/form-data"

    注意：上传的图片目录要存在

     router.post('/doAdd', upload.single('pic'),async (ctx)=>{

         ctx.body = {
             filename: ctx.req.file.filename,  //返回文件名
             body:ctx.req.body
         }

     })

* */