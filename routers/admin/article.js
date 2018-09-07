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


var router = require('koa-router')();

var DB=require('../../model/db.js');
var tools=require('../../model/tools.js');

//图片上传模块

const multer = require('koa-multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {


        cb(null, 'public/upload');   /*配置图片上传的目录     注意：图片上传的目录必须存在*/
    },
    filename: function (req, file, cb) {   /*图片上传完成重命名*/
        var fileFormat = (file.originalname).split(".");   /*获取后缀名  分割数组*/
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
var upload = multer({ storage: storage });





router.get('/',async (ctx)=>{

    var page=ctx.query.page ||1;
    var pageSize=10;

    //查询总数量
    var count= await  DB.count('article',{});
    var result=await DB.find('article',{},{},{
        page:page,
        pageSize:pageSize
    });


    await  ctx.render('admin/article/index',{
        list: result,
        page:page,
        totalPages:Math.ceil(count/pageSize)
    });

})




router.get('/add',async (ctx)=>{

    //查询分类数据

    var catelist=await DB.find('articlecate',{});

    console.log(tools.changeData(catelist));

    await  ctx.render('admin/article/add',{

        catelist:tools.changeData(catelist)
    });

})

//提交数据到 数据库
router.post('/doAdd', upload.single('img_url'),async (ctx)=>{

    // ctx.body = {
    //     filename:ctx.req.file?ctx.req.file.filename : '',  //返回文件名
    //     body:ctx.req.body
    // }

    let pid=ctx.req.body.pid;
    let catename=ctx.req.body.catename.trim();
    let title=ctx.req.body.title.trim();
    let author=ctx.req.body.author.trim();
    let pic=ctx.req.body.author;
    let status=ctx.req.body.status;
    let is_best=ctx.req.body.is_best;
    let is_hot=ctx.req.body.is_hot;
    let is_new=ctx.req.body.is_new;
    let keywords=ctx.req.body.keywords;
    let description=ctx.req.body.description || '';
    let content=ctx.req.body.content ||'';
    let img_url=ctx.req.file? ctx.req.file.path :'';

    //属性的简写
    let json={
        pid,catename,title,author,status,is_best,is_hot,is_new,keywords,description,content,img_url
    }

    var result=DB.insert('article',json);

    //跳转
    ctx.redirect(ctx.state.__HOST__+'/admin/article');

})

//编辑内容




module.exports=router.routes();
