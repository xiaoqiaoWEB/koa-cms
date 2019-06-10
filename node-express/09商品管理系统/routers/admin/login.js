const express = require('express')

const router = express.Router();

let bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

let md5 = require("md5-node")

let DB = require('../../modules/db')

router.get('/', (req, res) => {
  //res.send('login');
  res.render('admin/login')
})

router.post('/doLogin', (req, res) => {
  var username=req.body.username;
  var password=md5(req.body.password);  /*要对用户输入的密码加密*/
  DB.find('admin',{
    username,
    password
  },(err, data) => {
    if(data.length > 0) {
      console.log('login success');
      //保存用户信息
      req.session.userinfo=data[0];
      res.redirect('/admin/product');  /*登录成功跳转到商品列表*/
    } else {
      console.log('login fail')
      res.send("<script>alert('登录失败');location.href='/admin/login'</script>");
    }
  })
})

module.exports = router;