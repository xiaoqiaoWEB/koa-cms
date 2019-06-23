const router = require('koa-router')()
const DB = require('../../model/db')
const tool = require('../../model/tool')

router.get('/', async (ctx) => {
 
  let page = ctx.query.page || 1;
  let pageSize = 5;
  // 查询 总量
  let count = await DB.count('classification', {})
  let result = await DB.find('classification', {}, {}, {});

  let list = tool.dataArray(result)
 
  await ctx.render('admin/classification/index.html', {
    list: list
  })
})

router.get('/add', async (ctx) => {
  //  pid 0 一级分类 
  let firstData = await DB.find('classification', {'pid': '0'})

  await ctx.render('admin/classification/add.html', {
    catelist: firstData
  })
})

// add
router.post('/doAdd', async (ctx) => {
  let {title, pid, keywords, status, description} = ctx.request.body;
  let result = DB.insert('classification', {
    title,
    pid,
    keywords,
    status,
    description
  })
  await ctx.redirect(ctx.state.__HOST__+'/admin/classification')
})

router.get('/edit', async (ctx) => {
  let id = ctx.query.id
  let result = await DB.find('classification', {'_id': DB.getObjectId(id)})
  let firstData = await DB.find('classification', {'pid': '0'})

  await ctx.render('admin/classification/edit.html', {
    list:result[0],
    catelist:firstData
  })
})

router.post('/doEdit', async (ctx) => {
  let {title, id, pid, keywords, status, description} = ctx.request.body;

  let result = await DB.updata(
    'classification', 
    {'_id': DB.getObjectId(id)}, {
      title, pid, keywords, status, description
    }
  )
  ctx.redirect(ctx.state.__HOST__+'/admin/classification');
})

module.exports = router.routes();