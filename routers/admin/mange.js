const router = require('koa-router')();
const DB = require('../../model/db.js');
const tools = require('../../model/tools.js')

router.get('/',async (ctx)=>{

   let result = await DB.find('admin',{});

   await ctx.render('admin/mange/list.html',{
       result
   })
})

//添加管理员
router.get('/add',async (ctx)=>{
    await ctx.render('admin/mange/add.html')
})

router.post('/doAdd', async (ctx)=>{
    //1.获取表单提交的数据    console.log(ctx.request.body);

    //2.验证表单数据是否合法

    //3.在数据库查询当前要增加的管理员是否存在

    //4.增加管理员
    //ctx.body = '123'

    ///console.log(ctx.request.body)

    var username = ctx.request.body.username;
    var password = ctx.request.body.password;
    var rpassword = ctx.request.body.rpassword;

    if(!/^\w{4,20}/.test(username)){

        await ctx.render('admin/error',{
            message:'用户名不合法',
            redirect:ctx.state.__HOST__+'/admin/mange/add'
        })

    }else if(password!=rpassword ||password.length>6){

        await ctx.render('admin/error',{
            message:'密码和确认密码不一致，或者密码长度小于6位',
            redirect:ctx.state.__HOST__+'/admin/mange/add'
        })

    }else{

        //数据库查询当前管理员是否存在
        var findResult = await DB.find('admin',{"username":username});

        if(findResult.length>0){
            await  ctx.render('admin/error',{
                message:'此管理员已经存在，请换个用户名',
                redirect:ctx.state.__HOST__+'/admin/mange/add'
            })

        }else{

            //增加管理员
            var addResult =await DB.insert('admin',{"username":username,"password":tools.md5(password),"status":1,"last_time":""});

            ctx.redirect(ctx.state.__HOST__+'/admin/mange');
        }
    }
})


//编辑 管理员
router.get('/edit',async (ctx)=>{

    let id = ctx.query.id;

    //查找数据
    let result = await DB.find('admin',{"_id":DB.getObjectId(id)})

    await ctx.render('admin/mange/edit.html',{
        list:result[0]
    })
})

router.post('/doEdit',async (ctx)=>{
    try{
        var id=ctx.request.body.id;
        var username=ctx.request.body.username;
        var password=ctx.request.body.password;
        var rpassword=ctx.request.body.rpassword;

        if(password!=''){
            if(password!=rpassword ||password.length>6){

                await ctx.render('admin/error',{
                    message:'密码和确认密码不一致，或者密码长度小于6位',
                    redirect:ctx.state.__HOST__+'/admin/mange/edit?id='+id
                })

            }else{
                //更新密码
                var updateResult=await DB.update('admin',{"_id":DB.getObjectId(id)},{"password":tools.md5(password)});
                ctx.redirect(ctx.state.__HOST__+'/admin/mange');
            }
        }else{
            ctx.redirect(ctx.state.__HOST__+'/admin/mange');
        }

    }catch(err){
        await ctx.render('admin/error',{
            message:err,
            redirect:ctx.state.__HOST__+'/admin/mange/edit?id='+id
        })

    }

})

module.exports =router.routes();
