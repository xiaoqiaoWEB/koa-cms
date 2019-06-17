const router = require('koa-router')()
const DB = require('../../model/db')
const tool = require('../../model/tool')

router.get('/', async (ctx) => {
  let result = await DB.find('user', {});
  await ctx.render('admin/user/list.html', {
    list: result
  })
})

router.get('/add', async (ctx) => {
  await ctx.render('admin/user/add.html')
})

// 添加用户
router.post('/doAdd', async (ctx) => {
  let {username, password, rpassword} = ctx.request.body;
  if(!/^\w{4,20}/.test(username)){
    await ctx.render('admin/error', {
      message:'用户名不合法',
      redirect:ctx.state.__HOST__+'/admin/user/add'
    })
  } else if (password!=rpassword || password.length<6) {
    await ctx.render('admin/error', {
      message:'密码和确认密码不一致，或者密码长度小于6位',
      redirect:ctx.state.__HOST__+'/admin/user/add'
    })
  } else {
    // 查询数据库 看用户名 是否 已存在
    let findResult = await DB.find('user', {username})
    if(findResult.length > 0) {
      await ctx.render('admin/error', {
        message:'管理员已经存在，请换个用户名',
        redirect:ctx.state.__HOST__+'/admin/user/add'
      })
    } else {
      let addResult = await DB.insert('user', {username, 'password': tool.md5(password), 'status': 1, 'last_time': ''})
      //console.log(addResult.CommandResult)
      ctx.redirect(ctx.state.__HOST__+'/admin/user');
    }
  }
})

router.get('/edit', async (ctx) => {
  let id = ctx.query.id;
  let data = await DB.find('user', {'_id': DB.getObjectId(id)});
  await ctx.render('admin/user/edit.html', {
    list: data[0]
  })
})

router.post('/doEdit', async (ctx) => {
  let {id, username, password, rpassword} = ctx.request.body;
  try {
    if(password!=''){
      if(password!=rpassword ||password.length<6){
        await ctx.render('admin/error',{
          message:'密码和确认密码不一致，或者密码长度小于6位',
          redirect:ctx.state.__HOST__+'/admin/user/edit?id='+id
        })
      } else {
        // 更新密码
        let updateResult = await DB.updata('user', {'_id': DB.getObjectId(id)}, {"password": tool.md5(password)})
        ctx.redirect(ctx.state.__HOST__+'/admin/user');
      }
    } else {
      ctx.redirect(ctx.state.__HOST__+'/admin/user');
    }
  } catch (err) {
    await ctx.render('admin/error',{
      message:err,
      redirect:ctx.state.__HOST__+'/admin/user/edit?id='+id
    })
  }
})

module.exports = router.routes(); 