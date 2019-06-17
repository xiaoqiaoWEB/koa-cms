const router = require('koa-router')()

router.get('/', async (ctx) => {
  ctx.render('admin/classification/index.html')
})

router.get('/add', async (ctx) => {
  ctx.render('admin/classification/add.html')
})

module.exports = router.routes();