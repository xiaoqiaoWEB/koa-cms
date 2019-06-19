const router = require('koa-router')()
const DB = require('../../model/db')

router.get('/', async (ctx) => {
  ctx.render('admin/index');
})

router.get('/changeStatus', async (ctx) => {
 
  let {db, attr, id} = ctx.query;

  let data = await DB.find(db, {'_id': DB.getObjectId(id)})

  if(data.length > 0) {
    if(data[0][attr] == 1) {
      var json = {
        [attr]: 0
      }
    } else {
      var json = {
        [attr]: 1
      }
    } 

    let updateResult = await DB.updata(db, {"_id": DB.getObjectId(id)}, json);

    if(updateResult) {
      ctx.body={"message":'更新成功',"success":true};
    } else {
      ctx.body={"message":"更新失败","success":false}
    }
  } else {
    ctx.body={"message":'更新失败,参数错误',"success":false};
  }
  
  ctx.body={"message":'更新成功',"success":true};
})

router.get('/remove', async (ctx) => {
  try {
    let {db, id} = ctx.query;
    let result = await DB.remove(db, {'_id': DB.getObjectId(id)})
    ctx.redirect(ctx.state.G.prevPage);
  } catch (err) {
    ctx.redirect(ctx.state.G.prevPage);
  } 
})

module.exports=router.routes();