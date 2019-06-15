const router = require('koa-router')()

router.get('/', async (ctx) => {
  await ctx.render('admin/user/index.html')
})

router.get('/add', async (ctx) => {
  await ctx.render('admin/user/add.html')
})

router.get('/edit', async (ctx) => {
  await ctx.render('admin/user/edit.html')
})

module.exports = router.routes(); 