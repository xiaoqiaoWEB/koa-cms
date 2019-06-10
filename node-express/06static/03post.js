let http = require('http')
let ejs = require('ejs')
let url = require('url')

http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type":"text/html;charset='utf-8'"})

  let pathName = url.parse(req.url, true).pathname;
  var method=req.method.toLowerCase();
  
  if(pathName == '/post') {

    console.log('A')
    ejs.renderFile('views/post.ejs',{
      msg: 'no'
    },(err, data) => {
      res.end(data)
    })

  }


  if(pathName == '/postLing' && method == 'post') {

    let postStr = ''
    req.on('data', (chunk) => {
      postStr += chunk
    })

    req.on('end', (err, chunk) => {

      if(err) {
        console.log(err)
        return 
      }

      //得到 post 传值
      console.log(postStr)

      res.end("<script>alert('success')</script>")
    })
  } 

 
}).listen(8001)