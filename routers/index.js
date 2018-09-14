const router = require('koa-router')();
const DB = require('../model/db.js');
const url = require('url');


router.use(async (ctx,next)=>{

    var pathname=url.parse(ctx.request.url,true).pathname;

    var navlist = await DB.find('navbar',{$or:[{"status":1},{"status":"1"}]},{},{sortJson:{'sort':1}});

    ctx.state.pathname = pathname;
    ctx.state.navlist = navlist;
    ctx.state.__HOST__ = "http://" + ctx.request.header.host;

    await next();
})

//首页
router.get('/',async (ctx)=>{

    var focuslist = await DB.find("focus",{$or:[{"status":1},{"status":"1"}]},{},{sortJson:{'sort':1}});

    await ctx.render('default/index.html',{
        focuslist:focuslist
    })
})

//news
router.get('/news',async (ctx)=>{
    await ctx.render('default/news.html')
})

//service
router.get('/service',async (ctx)=>{

    var servicelist = await DB.find('article',{'pid':'5b9237ccfc2da21ecc0f762e'})

    await ctx.render('default/service.html',{
        servicelist
    })
})

//about
router.get('/about',async (ctx)=>{
    await ctx.render('default/about.html')
})

//case
router.get('/case',async (ctx)=>{

    var pid=ctx.query.pid;
    //默认页数
    var page=ctx.query.page || 1;
    //每页的数量
    var pageSize=6;

    //查找 case 子分类
    let subCaseList = await DB.find('articlecate',{'pid':'5b9238ccdb1790186cb21684'});

    if(!pid){

        let allCase = []; //存放所有分类的 ID 利用 $in 查找
        for(var i=0;i<subCaseList.length;i++){
            allCase.push(subCaseList[i]._id.toString());
        }
        //利用 $in 查找
        var  allCalseList = await DB.find('article',{'pid':{$in:allCase}},{},{
            page,
            pageSize
        });

        var articleNum = await DB.count('article',{'pid':{$in:allCase}});

    }else{

        var allCalseList = await DB.find('article',{'pid':pid},{},{
            page,
            pageSize
        });

        var articleNum = await DB.count('article',{'pid':pid})
    }


    await ctx.render('default/case.html',{
        subCaseList,
        allCalseList,
        pid,
        page,
        totalPages:Math.ceil(articleNum/pageSize)
    })
})

//联系我们
router.get('/connect',async (ctx)=>{
    await ctx.render('default/connect.html')
})


//详情页
router.get('/content/:id',async (ctx)=>{

    var id=ctx.params.id;

    var content=await  DB.find('article',{'_id':DB.getObjectId(id)});

    /*
   1.根据文章获取文章的分类信息

   2、根据文章的分类信息，去导航表里面查找当前分类信息的url

   3、把url赋值给 pathname
   * */

    //获取当前文章的分类信息
    let pid = content[0].pid;
    cateResult = await DB.find('articlecate',{'_id':DB.getObjectId(pid)});

    //判断是否是一级分类
    if(cateResult[0].pid != 0){ //不是一级分类找到父分类

        var parentCateResult = await DB.find('articlecate',{'_id':DB.getObjectId(cateResult[0].pid)});
        var navResult=await  DB.find('navbar',{$or:[{'title':cateResult[0].title},{'title':parentCateResult[0].title}]});

    }else{ //没有父分类

        var navResult=await  DB.find('navbar',{'title':cateResult[0].title});

    }

    if(navResult.length>0){
        //把url赋值给 pathname
        ctx.state.pathname=navResult[0]['url'];

    }else{
        ctx.state.pathname='/';
    }


    ctx.render('default/content',{
        list:content[0]
    });
})

module.exports =router.routes();

