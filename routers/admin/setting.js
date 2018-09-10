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

    //ctx.body='系统设置';
    //获取设置的信息

    var result=await DB.find('set',{});

    await ctx.render('admin/setting/list.html',{
        list:result[0]
    });



})







router.post('/doEdit',upload.single('site_logo'),async (ctx)=>{

    //ctx.body='系统设置';
    //获取设置的信息

    var site_title=ctx.req.body.site_title;
    let site_logo=ctx.req.file? ctx.req.file.path.substr(7) :'';
    var site_keywords=ctx.req.body.site_keywords;
    var site_description=ctx.req.body.site_description;
    var site_icp=ctx.req.body.site_icp;
    var site_qq=ctx.req.body.site_qq;
    var site_tel=ctx.req.body.site_tel;
    var site_address=ctx.req.body.site_address;
    var site_status=ctx.req.body.site_status;
    var add_time=new Date();


    if(site_logo){
        var json={
            site_title,site_logo,site_keywords,site_description,site_icp,site_qq,site_tel,site_address,site_status,add_time

        }
    }else{
        var json={
            site_title,site_keywords,site_description,site_icp,site_qq,site_tel,site_address,site_status,add_time

        }

    }

    await  DB.update('set',{},json);
    ctx.redirect(ctx.state.__HOST__+'/admin/setting');

})

module.exports=router.routes();
