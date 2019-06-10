/*
 1. fs.stat  检测是文件还是目录
 2. fs.mkdir  创建目录
 3. fs.writeFile  创建写入文件
 4. fs.appendFile 追加文件
 5.fs.readFile 读取文件
 6.fs.readdir读取目录
 7.fs.rename 重命名
 8. fs.rmdir  删除目录
 9. fs.unlink删除文件
*/

const fs = require('fs')

// fs.stat('html', (err, state) => {
//   if(err) {
//     console.log(err)
//     return
//   }
//   console.log('html:' + state.isFile())
//   console.log('html:' + state.isDirectory())
// })


// fs.mkdir('css', (err) => {
//   if(err) {
//     console.log(err.path)
//     return 
//   }
// })

// fs.writeFile('css5', 'kkkkk','utf8', (err) => {
//   if(err) {
//     console.log(err)
//     return 
//   }
//   console.log('写入成功')
// })
