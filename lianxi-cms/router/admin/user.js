const router = require('koa-router')()
const DB = require('../../model/db')

router.get('/', async (ctx) => {
  let result = await DB.find('user', {});

  await ctx.render('admin/user/list.html', {
    list: result
  })
})

router.get('/add', async (ctx) => {
  await ctx.render('admin/user/add.html')
})

// router.get('/edit', async (ctx) => {
//   await ctx.render('admin/user/edit.html')
// })

module.exports = router.routes(); 