const express = require('express')

let login = require('./admin/login')
let product = require('./admin/product')

const router = express.Router();

//权限验证
router.use((req, res, next) => {
  console.log(req.url)
  if(req.url=='/login' || req.url=='/login/doLogin'){
    next();
  } else {
    if(req.session.userinfo&&req.session.userinfo.username!=''){
      req.app.locals['userinfo']=req.session.userinfo; 
      next(); 
    } else {
      res.redirect('/admin/login');
    }
  } 
})

router.get('/', (req, res) => {
  res.send('admin')
})

router.use('/login', login);
router.use('/product', product);

module.exports = router;