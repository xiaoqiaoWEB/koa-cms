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

    var result = await DB.find('links',{},{},{
        sortJson:{
            "add_time":1
        }
    })

    await ctx.render('admin/links/list',{
        list:result
    });
})

router.get('/add',async (ctx)=>{
    ctx.render('admin/links/add.html')
})

router.post('/doAdd',upload.single('link_log'),async (ctx)=>{

    var title=ctx.req.body.title;
    let link_log=ctx.req.file? ctx.req.file.path.substr(7) :'';
    var url=ctx.req.body.url;
    var sort=ctx.req.body.sort;
    var status=ctx.req.body.status;
    var add_time=new Date();

    await  DB.insert('links',{
        title,link_log,url,sort,status,add_time
    })

    //跳转
    ctx.redirect(ctx.state.__HOST__+'/admin/links');
})


router.get('/edit',async (ctx)=>{

    var id = ctx.query.id;
    var result = await DB.find('links',{"_id":DB.getObjectId(id)});

    console.log(result)

    await ctx.render('admin/links/edit.html',{
        list:result[0]
    })

})

//执行编辑数据
router.post('/doEdit',upload.single('link_log'),async (ctx)=>{

    var id=ctx.req.body.id;
    var title=ctx.req.body.title;
    let link_log=ctx.req.file? ctx.req.file.path.substr(7) :'';
    var url=ctx.req.body.url;
    var sort=ctx.req.body.sort;
    var status=ctx.req.body.status;
    var add_time= new Date();
    var prevPage=ctx.req.body.prevPage;

    if(link_log){

        var json={

            title,link_log,url,sort,status,add_time
        }
    }else{
        var json={

            title,url,sort,status,add_time
        }

    }
    await  DB.update('links',{'_id':DB.getObjectId(id)},json);


    if(prevPage){
        ctx.redirect(prevPage);
    }else{
        //跳转
        ctx.redirect(ctx.state.__HOST__+'/admin/links');

    }

})


module.exports=router.routes();
