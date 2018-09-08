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
    //获得轮播图列表
    var result = await DB.find('focus',{});

    await ctx.render('admin/focus/index.html',{
        list:result
    })
})

router.get('/add',async (ctx)=>{

    await ctx.render('admin/focus/add.html')
})

//接收 图片
router.post('/doAdd',upload.single('pic'),async (ctx)=>{


    var title=ctx.req.body.title;

    let pic=ctx.req.file? ctx.req.file.path.substr(7) :'';

    var url=ctx.req.body.url;

    var sort=ctx.req.body.sort;

    var status=ctx.req.body.status;

    var add_time=new Date();


    await  DB.insert('focus',{
        title,pic,url,sort,status,add_time
    })

    //跳转
    ctx.redirect(ctx.state.__HOST__+'/admin/focus');

})


//编辑
router.get('/edit',async (ctx)=>{
    let id = ctx.query.id;
    let result = await DB.find('focus',{"_id":DB.getObjectId(id)});

    await ctx.render('admin/focus/edit.html',{
        list:result[0],
        prevPage:ctx.state.G.prevPage
    })
})

router.post('/doAdd',upload.single('pic'),async (ctx)=>{
    var id=ctx.req.body.id;
    var title=ctx.req.body.title;
    let pic=ctx.req.file? ctx.req.file.path.substr(7) :'';
    var url=ctx.req.body.url;
    var sort=ctx.req.body.sort;
    var status=ctx.req.body.status;
    var add_time=tools.getTime();
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

    await  DB.update('focus',{'_id':DB.getObjectId(id)},json);

    if(prevPage){
        ctx.redirect(prevPage);
    }else{
        //跳转
        ctx.redirect(ctx.state.__HOST__+'/admin/focus');

    }

})

module.exports=router.routes();
