let http = require('http')
let fs = require('fs')
let path = require('path')
let url = require('url')

let mimeModel = require('./model/getMime.js')

http.createServer((req, res) => {

  var pathname=url.parse(req.url).pathname;
  console.log(pathname)

  if(pathname=='/'){
		pathname='/index.html'; 
  }

  //获取文件的后缀名
	var extname=path.extname(pathname);
  
  fs.readFile('static/' + pathname, (err, data) => {
    if(err) {
      console.log('404')
      fs.readFile('static/404.html',function(error,data404){
        if(error){
          console.log(error);
        }
        res.writeHead(404,{"Content-Type":"text/html;charset='utf-8'"});
        res.write(data404);
        res.end(); /*结束响应*/
      })
    } else {
      var mime=mimeModel.getMime(extname);  /*获取文件类型*/
      res.writeHead(200,{"Content-Type":""+mime+";charset='utf-8'"});
      res.write(data);
      res.end(); /*结束响应*/
    }
  
  })

}).listen(8000)