const Koa = require('koa');
const router = require('koa-router')();
const path = require('path');
const render = require('koa-art-template');
const static = require('koa-static');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const sd = require('silly-datetime');
const jsonp = require('koa-jsonp');

const app = new Koa();

//配置模板引擎
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html', //后缀名
    debug: process.env.NODE_ENV !== 'production',
    dateFormat:dateFormat=function(value){
        return sd.format(value, 'YYYY-MM-DD HH:mm');
    } /*扩展模板里面的方法*/
});

//配置 静态资源的中间件
app.use(static(__dirname + '/public'));

//配置post提交数据的中间件
app.use(bodyParser());

//配置 session 中间件
app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess',
    maxAge: 1000*60*60,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true,   /*每次请求都重新设置session*/
    renew: false,
};
app.use(session(CONFIG, app));

//配置jsonp 中间件
app.use(jsonp());


//引入路由模块
let api = require('./routers/api.js');
let admin = require('./routers/admin.js');
let index = require('./routers/index.js');

//配置层级路由
router.use('/admin',admin);
router.use('/api',api);
router.use(index);


/*启动路由*/
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8000);
